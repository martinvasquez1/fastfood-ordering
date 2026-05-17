import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './order.service';
import { OrdersRepository } from './orders.repository';

import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), MenuModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}