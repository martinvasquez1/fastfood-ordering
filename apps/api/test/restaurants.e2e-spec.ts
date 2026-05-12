import { StartedTestContainer } from 'testcontainers';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { createPostgresContainer } from './util/create-postgres-container';
import { createApp } from './util/create-app';

import { DataSource } from 'typeorm';
import cleanDatabase from './util/clean-database';

import { RestaurantsModule } from 'src/restaurants/restaurant.module';
import { MenuModule } from 'src/menu/menu.module';

import { Restaurant } from 'src/restaurants/restaurant.entity';
import { MenuCategory } from 'src/menu/menu-category.entity';
import { MenuItem } from 'src/menu/menu-item.entity';
import { RestaurantStock } from 'src/restaurants/restaurant-stock.entity';

describe('/restaurants', () => {
  let app: INestApplication;
  let startedContainer: StartedTestContainer;
  let dataSource: DataSource;

  beforeAll(async () => {
    const { container, dbURL } = await createPostgresContainer();
    startedContainer = container;

    app = await createApp([RestaurantsModule, MenuModule], dbURL);
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
      const { body } = await request(app.getHttpServer()).get(`/restaurants`).expect(200);

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

      const { body } = await request(app.getHttpServer()).get('/restaurants').expect(200);

      expect(body.data).toHaveLength(1);
      expect(body.data[0]).toEqual({
        name: 'R1',
        address: 'Test Street',
        id: 1,
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

  describe('GET /restaurants/:id', () => {
    it('should return a restaurant by id', async () => {
      const repo = dataSource.getRepository(Restaurant);
      const saved = await repo.save({
        name: 'R1',
        address: '...',
      });

      const response = await request(app.getHttpServer())
        .get(`/restaurants/${saved.id}`)
        .expect(200);

      expect(response.body).toEqual({
        id: saved.id,
        name: 'R1',
        address: '...',
      });
    });

    it('should return 404 if restaurant not found', async () => {
      await request(app.getHttpServer())
        .get('/restaurants/777')
        .expect(404);
    });

    it('should return 400 for invalid id', async () => {
      await request(app.getHttpServer())
        .get('/restaurants/invalid-id')
        .expect(400);
    });
  });

  describe('GET /restaurants/:id/menu', () => {
    it('should return 404 if restaurant not found', async () => {
      await request(app.getHttpServer())
        .get(`/restaurants/1/menu`)
        .expect(404);
    });

    it('should get empty result if no menu items', async () => {
      const repo = dataSource.getRepository(Restaurant);
      const restaurant = await repo.save({ name: 'R1', address: '...' });

      const res = await request(app.getHttpServer())
        .get(`/restaurants/${restaurant.id}/menu`)
        .expect(200);

      expect(res.body).toStrictEqual([]);
    });

    describe('get items', () => {
      let restaurant1;
      let menuCategory1;
      let menuCategory2;
      let menuItem1;
      let menuItem2;
      let restStock1;
      let restStock2;

      beforeAll(async () => {
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
      })

      it('should get menu with two items', async () => {
        const res = await request(app.getHttpServer())
          .get(`/restaurants/1/menu`)
          .expect(200);

        expect(res.body).toHaveLength(2);
        expect(res.body).toEqual([
          expect.objectContaining({
            category: menuCategory1.name,
            items: expect.arrayContaining([
              expect.objectContaining({
                name: menuItem1.name,
                quantity: restStock1.quantity,
              }),
            ]),
          }),
          expect.objectContaining({
            category: menuCategory2.name,
            items: expect.arrayContaining([
              expect.objectContaining({
                name: menuItem2.name,
                quantity: restStock2.quantity,
              }),
            ]),
          }),
        ]);
      });
    });
  });
});
