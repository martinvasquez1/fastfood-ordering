import { StartedTestContainer } from 'testcontainers';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { createPostgresContainer } from './util/create-postgres-container';
import { createApp } from './util/create-app';

import { UsersModule } from 'src/users/users.module';
import { User, UserRole } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DataSource } from 'typeorm';
import cleanDatabase from './util/clean-database';

const dto = {
  username: 'user',
  email: 'user@user.com',
  password: '123',
};

let user: User;
let userToken: string;

describe('/users', () => {
  let app: INestApplication;
  let startedContainer: StartedTestContainer;
  let dataSource: DataSource;

  async function populateDatabase() {
    const { body } = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(dto);
    userToken = body.accessToken;

    const { body: getBody } = await request(app.getHttpServer())
      .get(`/users/1`)
      .set('Authorization', `Bearer ${userToken}`);
    user = getBody;
  }

  beforeAll(async () => {
    const { container, dbURL } = await createPostgresContainer();
    startedContainer = container;

    app = await createApp([UsersModule, AuthModule], dbURL);
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

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(body).toEqual(user);
    });

    it('should return 404 for non-existent user', async () => {
      await request(app.getHttpServer())
        .get(`/users/777`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update a user', async () => {
      const expectedUser = { ...user, username: 'newName' };

      const { body } = await request(app.getHttpServer())
        .patch(`/users/${user.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ username: expectedUser.username })
        .expect(200);

      const expected = { ...expectedUser, updatedAt: expect.any(String)}
      expect(body).toEqual(expected);
    });

    it('should return 404 for non-existent user', async () => {
      await request(app.getHttpServer())
        .patch(`/users/777`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ username: 'something' })
        .expect(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });

    it('should return deleted user', async () => {
      const { body } = await request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(body).toEqual(user);
    });

    it('should return 404 for non-existent user', async () => {
      await request(app.getHttpServer())
        .delete(`/users/777`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });
});
