import 'reflect-metadata';

import { createRoles } from './roles';
import { createRestaurants } from './restaurants';
import { createMenuCategories } from './menu-categories';
import { createMenuItems } from './menu-items';

export async function seed(dataSource) {
  await createRoles(dataSource);
  await createRestaurants(dataSource);
  await createMenuCategories(dataSource);
  await createMenuItems(dataSource);
}
