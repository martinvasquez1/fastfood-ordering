import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Payment } from './payment.entity';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment) private ORM: Repository<Payment>,
  ) { }

  async create(data: Partial<Payment>): Promise<Payment> {
    const payment = this.ORM.create(data);
    const savedPayment = this.ORM.save(payment);
    return savedPayment;
  }
}

