import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Restaurant } from './restaurant.entity';

import { RestaurantsController } from './restaurant.controller';
import { RestaurantsService } from './restaurant.service';
import { RestaurantsRepository } from './restaurant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsRepository],
})
export class RestaurantsModule {}
