import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, Repository } from 'typeorm';

import { Order } from './order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private readonly ORM: Repository<Order>,
  ) { }

  async createOrder(dto: DeepPartial<Order>): Promise<Order> {
    const order = this.ORM.create(dto);
    const savedOrder = this.ORM.save(order);
    return savedOrder;
  }

  async findOneById(id: number): Promise<Order | null> {
    return this.ORM.findOne({
      where: { id },
    });
  }

  async save(order: Order): Promise<Order> {
    return this.ORM.save(order);
  }
}