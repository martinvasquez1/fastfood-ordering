import { MenuItem } from '../menu/menu-item.entity';
import { MenuCategory } from '../menu/menu-category.entity';

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

export async function createMenuItems(dataSource) {
  const repo = dataSource.getRepository(MenuItem);
  const categoryRepo = dataSource.getRepository(MenuCategory);

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

