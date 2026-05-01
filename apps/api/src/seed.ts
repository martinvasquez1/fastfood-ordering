import 'reflect-metadata';
import { Role, RoleType } from './roles/role.entity';
import { Restaurant } from './restaurants/restaurant.entity';

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

export async function seed(dataSource) {
  await createRoles(dataSource);
  await createRestaurants(dataSource);
}
