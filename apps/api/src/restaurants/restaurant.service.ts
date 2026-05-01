import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantsRepository } from './restaurant.repository';
import { Restaurant } from './restaurant.entity';
import { PageDto } from 'src/common/pagination/page.dto';
import { PageOptions } from 'src/common/pagination/page-options.dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

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
}
