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
            userId: 1,
            cardNumber: "4111111111111111",
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
                id: user.id,
                userId: dto.userId,
                cardNumber: dto.cardNumber,
                holderName: dto.holderName,
                expires: dto.expires,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });

});

