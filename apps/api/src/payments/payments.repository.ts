import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment) private ORM: Repository<Payment>,
  ) { }

  async create(userId, dto: CreatePaymentDto): Promise<Payment> {
    const payment = this.ORM.create({ ...dto, userId });
    const savedPayment = this.ORM.save(payment);
    return savedPayment;
  }

  async findAll(): Promise<Payment[]> {
    return this.ORM.find({ order: { id: "ASC" } });
  }

  async findOneById(id: number): Promise<Payment | null> {
    return this.ORM.findOne({ where: { id } });
  }

  async delete(payment: Payment): Promise<void> {
    await this.ORM.remove(payment);
  }
}

