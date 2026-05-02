import { RestaurantStock } from 'src/restaurants/restaurant-stock.entity';
import { Restaurant } from '../restaurants/restaurant.entity';
import { MenuItem } from '../menu/menu-item.entity';

function generateStock(restaurants: Restaurant[], menuItems: MenuItem[]) {
  const stock: Partial<RestaurantStock>[] = [];

  for (const restaurant of restaurants) {
    for (const item of menuItems) {
      stock.push({
        restaurantId: restaurant.id,
        menuItemId: item.id,
        quantity: Math.floor(Math.random() * 16) + 5
      });
    }
  }

  return stock;
}

export async function createRestaurantStock(dataSource) {
  const stockRepo = dataSource.getRepository(RestaurantStock);
  const restaurantRepo = dataSource.getRepository(Restaurant);
  const menuItemRepo = dataSource.getRepository(MenuItem);

  const restaurants = await restaurantRepo.find();
  const menuItems = await menuItemRepo.find();

  const stockData = generateStock(restaurants, menuItems);

  for (const data of stockData) {
    const existing = await stockRepo.findOne({
      where: {
        restaurantId: data.restaurantId,
        menuItemId: data.menuItemId,
      },
    });

    if (!existing) {
      const stock = stockRepo.create(data);
      await stockRepo.save(stock);
      console.log(
        `Stock created: restaurant ${data.restaurantId} → item ${data.menuItemId}`
      );
    } else {
      console.log(
        `Stock already exists: restaurant ${data.restaurantId} → item ${data.menuItemId}`
      );
    }
  }
}