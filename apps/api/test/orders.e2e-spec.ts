import { StartedTestContainer } from 'testcontainers';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { createPostgresContainer } from './util/create-postgres-container';
import { createApp } from './util/create-app';

import { DataSource } from 'typeorm';
import cleanDatabase from './util/clean-database';

import { OrdersModule } from 'src/orders/orders.module';
import { MenuModule } from 'src/menu/menu.module';
import { RestaurantsModule } from 'src/restaurants/restaurant.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

import { User } from 'src/users/entities/user.entity';
import { OrderStatus } from 'src/orders/order.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { MenuCategory } from 'src/menu/menu-category.entity';
import { MenuItem } from 'src/menu/menu-item.entity';
import { RestaurantStock } from 'src/restaurants/restaurant-stock.entity';
import path from 'path';

import { ORDER_TRANSITIONS } from 'src/orders/order-state-machine';

const dto = {
    username: 'user',
    email: 'user@user.com',
    password: '123',
};

let user: User;
let userToken: string;
let restaurant1;
let menuCategory1;
let menuCategory2;
let menuItem1;
let menuItem2;
let restStock1;
let restStock2;

describe('/orders', () => {
    let app: INestApplication;
    let startedContainer: StartedTestContainer;
    let dataSource: DataSource;

    async function populateDatabase() {
        const { body } = await request(app.getHttpServer()).post('/auth/sign-up').send(dto);
        userToken = body.accessToken;

        const { body: getBody } = await request(app.getHttpServer())
            .get(`/users/1`)
            .set('Authorization', `Bearer ${userToken}`);
        user = getBody;

        const repo = dataSource.getRepository(Restaurant);
        restaurant1 = await repo.save({ name: 'R1', address: '...' });

        const repoCategory = dataSource.getRepository(MenuCategory);
        menuCategory1 = await repoCategory.save({ name: 'Burgers' });
        menuCategory2 = await repoCategory.save({ name: 'Drinks' });

        const repoMenuItem = dataSource.getRepository(MenuItem);
        menuItem1 = await repoMenuItem.save({
            name: 'Classic Burger',
            description: 'Beef burger with lettuce and tomato',
            price: 8990,
            categoryName: menuCategory1.name,
            menuCategoryId: menuCategory1.id,
        })
        menuItem2 = await repoMenuItem.save({
            name: 'Energy drink',
            description: '500ml',
            price: 1990,
            categoryName: menuCategory2.name,
            menuCategoryId: menuCategory2.id,
        })

        const repoRestStock = dataSource.getRepository(RestaurantStock);
        restStock1 = await repoRestStock.save({
            restaurantId: restaurant1.id,
            menuItemId: menuItem1.id,
            quantity: 10
        })
        restStock2 = await repoRestStock.save({
            restaurantId: restaurant1.id,
            menuItemId: menuItem2.id,
            quantity: 8
        })
    }

    beforeAll(async () => {
        const { container, dbURL } = await createPostgresContainer();
        startedContainer = container;

        app = await createApp([OrdersModule, RestaurantsModule, MenuModule, UsersModule, AuthModule], dbURL);
        dataSource = app.get(DataSource);

        await app.init();
    }, 100000);

    beforeEach(async () => await populateDatabase());
    afterEach(async () => await cleanDatabase(dataSource));

    afterAll(async () => {
        await dataSource.destroy();
        await app.close();
        await startedContainer.stop();
    }, 100000);

    it('should compile the module', async () => {
        expect(module).toBeDefined();
    });

    describe('POST /orders', () => {
        it('should create an order without assigning a driver', async () => {
            const dto = {
                restaurantId: 1,
                shippingAddress: 'ABC',
                items: [
                    {
                        menuItemId: menuItem1.id,
                        quantity: restStock1.quantity,
                    },
                ],
            };

            const response = await request(app.getHttpServer())
                .post('/orders')
                .set('Authorization', `Bearer ${userToken}`)
                .send(dto)
                .expect(201);

            const unitPrice = menuItem1.price;
            const quantity = restStock1.quantity;
            const subtotal = unitPrice * quantity;
            const totalPrice = subtotal;

            expect(response.body).toStrictEqual({
                id: 1,
                userId: user.id,
                driverId: null,
                restaurantId: dto.restaurantId,
                status: OrderStatus.PENDING,
                shippingAddress: dto.shippingAddress,
                notes: null,
                proofOfDelivery: null,
                totalPrice,
                items: [
                    {
                        id: expect.any(Number),
                        orderId: expect.any(Number),
                        menuItemId: menuItem1.id,
                        quantity,
                        unitPrice,
                        subtotal,
                    },
                ],
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });

    describe('PATCH /orders/:id', () => {
        let order1;

        beforeEach(async () => {
            const createDto = {
                restaurantId: 1,
                shippingAddress: 'ABC',
                items: [
                    {
                        menuItemId: menuItem1.id,
                        quantity: restStock1.quantity,
                    },
                ],
            };

            const res = await request(app.getHttpServer())
                .post('/orders')
                .set('Authorization', `Bearer ${userToken}`)
                .send(createDto)
                .expect(201);
            order1 = res.body;
        });

        it('should allow transition from PENDING to PREPARING', async () => {
            const response = await request(app.getHttpServer())
                .patch(`/orders/${order1.id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ status: OrderStatus.PREPARING })
                .expect(200);

            expect(response.body).toMatchObject({
                id: order1.id,
                status: OrderStatus.PREPARING,
            });
        });

        it('should return 404 when updating non-existing order', async () => {
            const updateDto = { status: OrderStatus.PREPARING };
            await request(app.getHttpServer())
                .patch('/orders/999999')
                .set('Authorization', `Bearer ${userToken}`)
                .send(updateDto)
                .expect(404);
        });

        describe('Order status transitions (fully generated)', () => {
            /**
            * Move order into a given state using valid forward transitions
            */
            async function moveToState(target: OrderStatus) {
                let currentStatus: OrderStatus = OrderStatus.PENDING;

                const isTarget = currentStatus === target;
                if (isTarget) return;

                while (currentStatus !== target) {
                    const nextStatuses = ORDER_TRANSITIONS[currentStatus];

                    let next: OrderStatus | undefined;

                    if (nextStatuses.includes(target)) {
                        next = target;
                    } else if (nextStatuses.length > 0) {
                        next = nextStatuses[0];
                    } else {
                        break;
                    }

                    const res = await request(app.getHttpServer())
                        .patch(`/orders/${order1.id}`)
                        .set('Authorization', `Bearer ${userToken}`)
                        .send({ status: next });

                    if (res.status !== 200) {
                        throw new Error(`Failed to move from ${currentStatus} → ${next}`);
                    }

                    if (!next) break;
                    currentStatus = next;
                }
            }

            const allStatuses = Object.keys(ORDER_TRANSITIONS) as OrderStatus[];

            const cases = allStatuses.flatMap((from) =>
                allStatuses.map((to) => ({
                    from,
                    to,
                    allowed: ORDER_TRANSITIONS[from].includes(to),
                })),
            );

            cases.forEach(({ from, to, allowed }) => {
                const action = allowed ? 'ALLOW' : 'REJECT';

                it(`should ${action} ${from} → ${to}`, async () => {
                    await moveToState(from);

                    const res = await request(app.getHttpServer())
                        .patch(`/orders/${order1.id}`)
                        .set('Authorization', `Bearer ${userToken}`)
                        .send({ status: to });

                    if (allowed) {
                        expect(res.status).toBe(200);
                        expect(res.body.status).toBe(to);
                    } else {
                        expect(res.status).toBe(400);
                    }
                });
            });
        });
    });
});