import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { RestaurantsService } from './restaurant.service';

import { PageDto } from 'src/common/pagination/page.dto';
import { Restaurant } from './restaurant.entity';
import { PageOptions } from 'src/common/pagination/page-options.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @ApiOperation({ operationId: 'getRestaurants' })
  async findAll(
    @Query() pageOptions: PageOptions,
    @Query('address') address?: string,
  ): Promise<PageDto<Restaurant>> {
    return this.restaurantsService.findAll(pageOptions, address);
  }
}
