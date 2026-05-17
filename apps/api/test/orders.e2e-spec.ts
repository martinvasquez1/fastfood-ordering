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

import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

const dto = {
    username: 'user',
    email: 'user@user.com',
    password: '123',
};

let user: User;
let userToken: string;

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
});