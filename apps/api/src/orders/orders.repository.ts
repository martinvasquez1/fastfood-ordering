import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, Repository } from 'typeorm';

import { Order, OrderStatus } from './order.entity';

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

  async findAll(
    userId?: number,
    driverId?: number,
    status?: OrderStatus,
  ): Promise<Order[]> {
    const where: any = {};

    if (userId !== undefined) where.userId = userId;
    if (driverId !== undefined) where.driverId = driverId;
    if (status !== undefined) where.status = status;

    return this.ORM.find({
      where,
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneById(id: number): Promise<Order | null> {
    return this.ORM.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async save(order: Order): Promise<Order> {
    return this.ORM.save(order);
  }
}