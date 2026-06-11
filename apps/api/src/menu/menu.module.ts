import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuItemsRepository } from './menu-item.repository';

import { MenuCategory } from './menu-category.entity';
import { MenuItem } from './menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory, MenuItem])],
  controllers: [],
  providers: [MenuItemsRepository],
  exports: [MenuItemsRepository]
})
export class MenuModule {}
