import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Restaurant } from './restaurant.entity';
import { RestaurantStock } from './restaurant-stock.entity';

import { RestaurantsController } from './restaurant.controller';
import { RestaurantsService } from './restaurant.service';
import { RestaurantsRepository } from './restaurant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantStock])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsRepository],
})
export class RestaurantsModule {}
