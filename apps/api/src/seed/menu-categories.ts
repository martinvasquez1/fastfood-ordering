import { MenuCategory } from '../menu/menu-category.entity';

function generateMenuCategories() {
  return [
    { name: 'Burgers' },
    { name: 'Drinks' },
    { name: 'Desserts' },
    { name: 'Salads' },
  ];
}

export async function createMenuCategories(dataSource) {
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

