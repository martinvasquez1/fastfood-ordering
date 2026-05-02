import 'reflect-metadata';
import { Role, RoleType } from './roles/role.entity';
import { Restaurant } from './restaurants/restaurant.entity';
import { MenuCategory } from './menu/menu-category.entity';
import { MenuItem } from './menu/menu-item.entity';

// TODO: Refactor, too messy.

async function createRoles(dataSource) {
  const repo = dataSource.getRepository(Role);

  const rolesToCreate = [RoleType.DRIVER];

  for (const roleName of rolesToCreate) {
    const existing = await repo.findOne({ where: { name: roleName } });

    if (!existing) {
      const role = repo.create({ name: roleName });
      await repo.save(role);
      console.log(`Created role: ${roleName}`);
    } else {
      console.log(`Role already exists: ${roleName}`);
    }
  }
}

function generateRestaurants(count = 10) {
  return Array.from({ length: count }, (_, i) => ({
    name: `Restaurant ${i + 1}`,
    address: `Address ${i + 1}`,
  }));
}

async function createRestaurants(dataSource) {
  const repo = dataSource.getRepository(Restaurant);
  const restaurantsToCreate = generateRestaurants(10);

  for (const data of restaurantsToCreate) {
    const existing = await repo.findOne({ where: { name: data.name } });

    if (!existing) {
      const restaurant = repo.create(data);
      await repo.save(restaurant);
      console.log(`Created restaurant: ${data.name}`);
    } else {
      console.log(`Restaurant already exists: ${data.name}`);
    }
  }
}

function generateMenuCategories() {
  return [
    { name: 'Burgers' },
    { name: 'Drinks' },
    { name: 'Desserts' },
    { name: 'Salads' },
  ];
}

async function createMenuCategories(dataSource) {
  const repo = dataSource.getRepository(MenuCategory);
  const categories = generateMenuCategories();

  for (const data of categories) {
    const existing = await repo.findOne({ where: { name: data.name } });

    if (!existing) {
      const category = repo.create(data);
      await repo.save(category);
      console.log(`Created menu category: ${data.name}`);
    } else {
      console.log(`Menu category already exists: ${data.name}`);
    }
  }
}

function generateMenuItems(categoryMap: Record<string, any>) {
  return [
    {
      name: 'Classic Burger',
      description: 'Beef burger with lettuce and tomato',
      price: 8990,
      categoryName: 'Burgers',
    },
    {
      name: 'Cheese Burger',
      description: 'Burger with cheese and special sauce',
      price: 9990,
      categoryName: 'Burgers',
    },
    {
      name: 'Drink',
      description: '500ml drink',
      price: 1990,
      categoryName: 'Drinks',
    },
    {
      name: 'Chocolate Cake',
      description: 'Rich chocolate dessert',
      price: 4500,
      categoryName: 'Desserts',
    },
  ].map(item => ({
    ...item,
    menuCategoryId: categoryMap[item.categoryName].id,
  }));
}

async function createMenuItems(dataSource) {
  const repo = dataSource.getRepository(MenuItem);
  const categoryRepo = dataSource.getRepository(require('./menu/menu-category.entity').MenuCategory);

  const categories = await categoryRepo.find();
  const categoryMap = Object.fromEntries(
    categories.map(c => [c.name, c])
  );

  const items = generateMenuItems(categoryMap);

  for (const data of items) {
    const existing = await repo.findOne({
      where: { name: data.name },
    });

    if (!existing) {
      const item = repo.create(data);
      await repo.save(item);
      console.log(`Created menu item: ${data.name}`);
    } else {
      console.log(`Menu item already exists: ${data.name}`);
    }
  }
}

export async function seed(dataSource) {
  await createRoles(dataSource);
  await createRestaurants(dataSource);
  await createMenuCategories(dataSource);
  await createMenuItems(dataSource);
}
