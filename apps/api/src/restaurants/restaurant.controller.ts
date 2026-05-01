import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { RestaurantsService } from './restaurant.service';
import { FindAllRestaurantsResponse } from './dto/find-all-restaurants-response.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Get()
  @ApiOperation({ operationId: 'getRestaurants' })
  findAll() {
    return this.restaurantsService.findAll();
  }
}