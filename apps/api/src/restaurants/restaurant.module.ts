import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from 'src/roles/role.entity';
import { UserRole } from 'src/roles/user-role.entity';

import { RestaurantsController } from './restaurant.controller';
import { RestaurantsService } from './restaurant.service';
import { RestaurantsRepository } from './restaurant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRole])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsRepository],
})
export class RestaurantModule {}