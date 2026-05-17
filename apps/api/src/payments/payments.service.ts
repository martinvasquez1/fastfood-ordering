import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';

import { Payment } from './payment.entity';
import { UsersService } from 'src/users/users.service';

import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly usersService: UsersService,
  ) { }

  async create(userId: number, dto: CreatePaymentDto): Promise<Payment> {
    await this.usersService.findOne(userId);
    return this.paymentsRepository.create(userId, dto);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.findAll();
  }
}
