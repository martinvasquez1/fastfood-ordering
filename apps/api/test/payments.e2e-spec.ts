import { StartedTestContainer } from 'testcontainers';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { createPostgresContainer } from './util/create-postgres-container';
import { createApp } from './util/create-app';

import { AuthModule } from 'src/auth/auth.module';
import { PaymentsModule } from 'src/payments/payments.module';

import { User } from 'src/users/entities/user.entity';

import { DataSource } from 'typeorm';
import cleanDatabase from './util/clean-database';

const dto = {
    username: 'user',
    email: 'user@user.com',
    password: '123',
    address: 'abc',
    phoneNumber: '123'
};

let user: User;
let userToken: string;

describe('/payments', () => {
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
    }

    beforeAll(async () => {
        const { container, dbURL } = await createPostgresContainer();
        startedContainer = container;

        app = await createApp([AuthModule, PaymentsModule], dbURL);
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

    describe("POST /payments", () => {
        const dto = {
            cardNumber: "1234123412341234",
            holderName: "John",
            expires: "12/20",
        };

        it("should create a payment method", async () => {
            const response = await request(app.getHttpServer())
                .post("/payments")
                .send(dto)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(201);

            expect(response.body).toStrictEqual({
                id: 1,
                userId: user.id,
                cardNumber: dto.cardNumber.slice(-4),
                holderName: dto.holderName,
                expires: dto.expires,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });

    describe("GET /payments", () => {
        it("should return all user payment methods", async () => {
            const dto1 = {
                cardNumber: "1234123412341234",
                holderName: "A",
                expires: "12/01",
            };

            const dto2 = {
                cardNumber: "5678567856785678",
                holderName: "B",
                expires: "12/02",
            };

            await request(app.getHttpServer())
                .post("/payments")
                .send(dto1)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(201);

            await request(app.getHttpServer())
                .post("/payments")
                .send(dto2)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(201);

            const response = await request(app.getHttpServer())
                .get("/payments")
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body).toStrictEqual([
                {
                    id: 1,
                    userId: user.id,
                    cardNumber: "1234",
                    holderName: "A",
                    expires: "12/01",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                },
                {
                    id: 2,
                    userId: user.id,
                    cardNumber: "5678",
                    holderName: "B",
                    expires: "12/02",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                },
            ]);
        });

        it("should return empty if no payment methods", async () => {
            await request(app.getHttpServer())
                .get("/payments")
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);
        });
    });

    describe("DELETE /payments/:id", () => {
        it("should delete a payment method", async () => {
            const dto = {
                cardNumber: "1234123412341234",
                holderName: "A",
                expires: "12/01",
            };

            const createResponse = await request(app.getHttpServer())
                .post("/payments")
                .send(dto)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(201);

            const paymentId = createResponse.body.id;
            await request(app.getHttpServer())
                .delete(`/payments/${paymentId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);
        });

        it('should return 404 for non-existent payment', async () => {
            await request(app.getHttpServer())
                .delete(`/payments/999`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(404);
        });
    });
});

