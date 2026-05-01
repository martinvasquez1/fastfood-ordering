import { StartedTestContainer } from 'testcontainers';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import path from 'path';

import { createPostgresContainer } from './util/create-postgres-container';
import { createApp } from './util/create-app';

import { AuthModule } from 'src/auth/auth.module';
import { DataSource } from 'typeorm';

import { seed } from './../src/seed';
import cleanDatabase from './util/clean-database';
import { buildDriverSignupRequest } from './factories/driver.factory';

const user1Dto = {
  username: 'user1',
  email: 'user1@example.com',
  password: '1',
};

describe('/auth', () => {
  let app: INestApplication;
  let startedContainer: StartedTestContainer;
  let dataSource: DataSource;

  beforeAll(async () => {
    const { container, dbURL } = await createPostgresContainer();
    startedContainer = container;

    app = await createApp([AuthModule], dbURL);
    dataSource = app.get(DataSource);

    await app.init();
  }, 100000);

  beforeEach(async () => {
    await seed(dataSource)
  })

  afterEach(async () => {
    await cleanDatabase(dataSource);
  }),

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
    await startedContainer.stop();
  }, 100000);

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  describe('POST /auth/sign-up', () => {
    it(`should return access token and user id`, async () => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user1Dto)
        .expect(201);

      expect(body).toEqual({
        accessToken: expect.any(String),
        userId: 1,
      });
    });

    it('should return 409 for duplicate email', async () => {
      await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user1Dto)
        .expect(201);
      await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user1Dto)
        .expect(409);
    });
  });

  describe('POST /auth/sign-up-driver', () => {
    const fakeImage = path.join(__dirname, './fixtures/small.jpg'); 
    const driverDto = {
      username: 'driver',
      email: 'driver@driver.com',
      password: '1',
      RUT: '11.111.111-1',
      vehicleType: 'car',
      plateNumber: '123456',
    }

    it(`should return access token and user id`, async () => {
      const httpServer = app.getHttpServer();
      const { body } = await buildDriverSignupRequest({ httpServer, fakeImage }).expect(201);

      expect(body).toEqual({
        accessToken: expect.any(String),
        userId: 1,
      });
    });

    it('should return 409 for duplicate email', async () => {
      const httpServer = app.getHttpServer();
      await buildDriverSignupRequest({ httpServer, fakeImage }).expect(201);
      await buildDriverSignupRequest({ httpServer, fakeImage }).expect(409);
    });
  });

  describe('POST /auth/sign-in', () => {
    it(`should return access token and user id for existing user`, async () => {
      await request(app.getHttpServer()).post('/auth/sign-up').send(user1Dto);
      const { body } = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send(user1Dto)
        .expect(200);

      expect(body).toEqual({
        accessToken: expect.any(String),
        userId: 1,
      });
    });

    it(`should return 404 for non-existent user`, async () => {
      await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send(user1Dto)
        .expect(404);
    });

    it(`should return 401 for invalid password`, async () => {
      await request(app.getHttpServer()).post('/auth/sign-up').send(user1Dto);
      await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ ...user1Dto, password: 'wrong_password' })
        .expect(401);
    });
  });
});
