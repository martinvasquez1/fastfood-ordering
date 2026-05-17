import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Restaurant } from './restaurant.entity';
import { RestaurantStock } from './restaurant-stock.entity';

import { RestaurantsController } from './restaurant.controller';
import { RestaurantsService } from './restaurant.service';
import { RestaurantsRepository } from './restaurant.repository';
import { OrdersModule } from 'src/orders/orders.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantStock]), OrdersModule, UsersModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsRepository],
})
export class RestaurantsModule {}
