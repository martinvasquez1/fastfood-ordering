import { StartedTestContainer } from 'testcontainers';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { createPostgresContainer } from './util/create-postgres-container';
import { createApp } from './util/create-app';

import { DataSource } from 'typeorm';
import cleanDatabase from './util/clean-database';
import { RestaurantsModule } from 'src/restaurants/restaurant.module';
import { Restaurant } from 'src/restaurants/restaurant.entity';

describe('/restaurants', () => {
    let app: INestApplication;
    let startedContainer: StartedTestContainer;
    let dataSource: DataSource;

    beforeAll(async () => {
        const { container, dbURL } = await createPostgresContainer();
        startedContainer = container;

        app = await createApp([RestaurantsModule], dbURL);
        dataSource = app.get(DataSource);

        await app.init();
    }, 100000);

    afterEach(async () => await cleanDatabase(dataSource));

    afterAll(async () => {
        await dataSource.destroy();
        await app.close();
        await startedContainer.stop();
    }, 100000);

    it('should compile the module', async () => {
        expect(module).toBeDefined();
    });

    describe('GET /restaurants', () => {
        it('should return an empty paginated response when no restaurants exist', async () => {
            const { body } = await request(app.getHttpServer())
                .get(`/restaurants`)
                .expect(200);

            expect(body).toEqual({
                data: [],
                meta: {
                    page: 1,
                    take: 10,
                    itemCount: 0,
                    pageCount: 0,
                    hasPreviousPage: false,
                    hasNextPage: false,
                },
            });
        });

        it('should return one restaurant in paginated response', async () => {
            const repo = dataSource.getRepository(Restaurant);
            await repo.save({
                name: 'R1',
                address: 'Test Street',
            });

            const { body } = await request(app.getHttpServer())
                .get('/restaurants')
                .expect(200);

            expect(body.data).toHaveLength(1);
            expect(body.data[0]).toEqual({
                name: 'R1',
                address: 'Test Street',
                id: 1
            });
            expect(body.meta).toEqual({
                page: 1,
                take: 10,
                itemCount: 1,
                pageCount: 1,
                hasPreviousPage: false,
                hasNextPage: false,
            });
        });

        it('should return filtered restaurants by address', async () => {
            const repo = dataSource.getRepository(Restaurant);

            await repo.save([
                { name: 'R1', address: 'Main Street 123' },
                { name: 'R2', address: 'Main Street 456' },
                { name: 'R3', address: 'Other Avenue 789' },
            ]);

            const { body } = await request(app.getHttpServer())
                .get('/restaurants?address=Main')
                .expect(200);

            expect(body.data).toHaveLength(2);

            expect(body.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: 'R1',
                        address: 'Main Street 123',
                    }),
                    expect.objectContaining({
                        name: 'R2',
                        address: 'Main Street 456',
                    }),
                ]),
            );

            expect(body.meta).toEqual({
                page: 1,
                take: 10,
                itemCount: 2,
                pageCount: 1,
                hasPreviousPage: false,
                hasNextPage: false,
            });
        });

        it('should return correct page when multiple pages exist', async () => {
            const repo = dataSource.getRepository(Restaurant);
            await repo.save(
                Array.from({ length: 15 }).map((_, i) => ({
                    name: `R${i}`,
                    address: `Street ${i}`,
                })),
            );

            const { body } = await request(app.getHttpServer())
                .get('/restaurants?page=2&take=10')
                .expect(200);

            expect(body.data).toHaveLength(5);
            expect(body.meta.page).toBe(2);
            expect(body.meta.pageCount).toBe(2);
            expect(body.meta.hasPreviousPage).toBe(true);
            expect(body.meta.hasNextPage).toBe(false);
        });

        it('should return empty when no address matches', async () => {
            const repo = dataSource.getRepository(Restaurant);
            await repo.save([{ name: 'R1', address: 'Street 1' }]);

            const { body } = await request(app.getHttpServer())
                .get('/restaurants?address=XYZ')
                .expect(200);

            expect(body.data).toEqual([]);
            expect(body.meta.itemCount).toBe(0);
        });

        it('should match address case-insensitively', async () => {
            const repo = dataSource.getRepository(Restaurant);
            await repo.save([{ name: 'R1', address: 'Main Street' }]);

            const { body } = await request(app.getHttpServer())
                .get('/restaurants?address=main')
                .expect(200);

            expect(body.data).toHaveLength(1);
        });
    });
});
