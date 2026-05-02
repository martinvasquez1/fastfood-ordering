import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

import { RestaurantsService } from './restaurant.service';

import { PageDto } from 'src/common/pagination/page.dto';
import { Restaurant } from './restaurant.entity';
import { PageOptions } from 'src/common/pagination/page-options.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Public()
  @Get()
  @ApiOperation({ operationId: 'getRestaurants' })
  async findAll(
    @Query() pageOptions: PageOptions,
    @Query('address') address?: string,
  ): Promise<PageDto<Restaurant>> {
    return this.restaurantsService.findAll(pageOptions, address);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ operationId: 'getRestaurant' })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Restaurant> {
    return this.restaurantsService.findOne(+id);
  }

  @Public()
  @Get(':id/menu')
  @ApiOperation({ operationId: 'getRestaurantMenu' })
  async getMenu(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.getRestaurantMenu(id);
  }
}
