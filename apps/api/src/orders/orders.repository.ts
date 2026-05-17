import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private readonly ORM: Repository<Order>,
  ) {}

  async createOrder(dto: DeepPartial<Order>): Promise<Order> {
    const order = this.ORM.create(dto);
    const savedOrder = this.ORM.save(order);
    return savedOrder;
  }
}