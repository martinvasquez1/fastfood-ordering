import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Driver } from './driver.entity';
import { DriverRepository } from './driver.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [DriverRepository],
  exports: [DriverRepository],
})
export class DriversModule {}
