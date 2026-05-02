import { Restaurant } from '../restaurants/restaurant.entity';

function generateRestaurants(count = 10) {
  return Array.from({ length: count }, (_, i) => ({
    name: `Restaurant ${i + 1}`,
    address: `Address ${i + 1}`,
  }));
}

export async function createRestaurants(dataSource) {
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

