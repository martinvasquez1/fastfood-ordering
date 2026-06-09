import { MenuItem } from '../menu/menu-item.entity';
import { MenuCategory } from '../menu/menu-category.entity';

function generateMenuItems(categoryMap: Record<string, any>) {
  return [
    {
      name: 'Classic Chicken Bacon Burger',
      description: 'Grilled chicken with bacon, melted cheese, lettuce, tomato, and red onion.',
      price: 8990,
      image: 'https://res.cloudinary.com/dqbaubhfl/image/upload/v1780936355/burger-1_qyeewg.jpg',
      categoryName: 'Burgers',
    },
    {
      name: 'Classic Bacon Cheeseburger',
      description: 'Beef burger with bacon, melted cheese, lettuce, tomato, and red onion.',
      price: 9990,
      image: 'https://res.cloudinary.com/dqbaubhfl/image/upload/v1780936492/burger-2_bzl43t.jpg',
      categoryName: 'Burgers',
    },
    {
      name: 'Cheesy Burger & Fries',
      description: 'Beef burger with melted cheese, served with fries, mayonnaise, and ketchup.',
      price: 6990,
      image: 'https://res.cloudinary.com/dqbaubhfl/image/upload/v1780936578/burger-3_yijldo.jpg',
      categoryName: 'Burgers',
    },
    {
      name: 'Cheesy Burger & Fries',
      description: 'Beef burger with melted cheese, served with fries, mayonnaise, and ketchup.',
      price: 6990,
      image: 'https://res.cloudinary.com/dqbaubhfl/image/upload/v1780936578/burger-3_yijldo.jpg',
      categoryName: 'Burgers',
    },
    {
      name: 'Double Cheese Pepperoni',
      description: 'Pepperoni with two cheeses and thinly sliced onions.',
      price: 7990,
      image: 'https://res.cloudinary.com/dqbaubhfl/image/upload/v1780937072/pizza-2_spx49s.jpg',
      categoryName: 'Pizzas',
    },
    {
      name: 'Ham & Basil Double Cheese',
      description: 'Ham with two cheeses, onions, and large basil leaves.',
      price: 7990,
      image: 'https://res.cloudinary.com/dqbaubhfl/image/upload/v1780937072/pizza-1_jichc7.jpg',
      categoryName: 'Pizzas',
    },
    {
      name: 'Tomato & Cheese',
      description: 'Classic pizza with tomato sauce and melted cheese.',
      price: 7990,
      image: 'https://res.cloudinary.com/dqbaubhfl/image/upload/v1780937072/pizza-3_h8indp.jpg',
      categoryName: 'Pizzas',
    },
    {
      name: 'Bacon Cheeseburger Combo',
      description: 'Beef burger with bacon, melted cheese, lettuce, tomato, red onion; served with fries and a cola.',
      price: 15990,
      image: 'https://res.cloudinary.com/dqbaubhfl/image/upload/v1780937799/combo-1_jzh8sm.jpg',
      categoryName: 'Combo',
    },
    {
      name: 'Cheeseburger Combo',
      description: 'Beef burger with melted cheese; served with fries and a cola.',
      price: 15990,
      image: 'https://res.cloudinary.com/dqbaubhfl/image/upload/v1780937799/combo-2_kya4ns.jpg',
      categoryName: 'Combo',
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

