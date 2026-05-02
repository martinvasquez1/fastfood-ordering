import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantsRepository } from './restaurant.repository';
import { Restaurant } from './restaurant.entity';
import { PageDto } from 'src/common/pagination/page.dto';
import { PageOptions } from 'src/common/pagination/page-options.dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) { }

  async findAll(pageOptions: PageOptions, address?: string): Promise<PageDto<Restaurant>> {
    const [data, itemCount] = await this.restaurantsRepository.findAll(pageOptions, address);
    const paginatedRestaurants = new PageDto(data, pageOptions, itemCount);
    return paginatedRestaurants;
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findById(id);
    if (!restaurant) throw new NotFoundException(`Restaurant with ID ${id} not found`);
    return restaurant;
  }

  async getRestaurantMenu(id: number) {
    await this.findOne(id)

    const stockItems = await this.restaurantsRepository.getRestaurantMenu(id);

    const grouped = new Map();

    for (const stock of stockItems) {
      const categoryName = stock.menuItem.menuCategory.name;

      if (!grouped.has(categoryName)) {
        grouped.set(categoryName, []);
      }

      grouped.get(categoryName).push({
        id: stock.menuItem.id,
        name: stock.menuItem.name,
        description: stock.menuItem.description,
        price: stock.menuItem.price,
        quantity: stock.quantity,
      });
    }

    return Array.from(grouped.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  }
}
