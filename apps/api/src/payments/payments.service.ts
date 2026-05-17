import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';

import { Payment } from './payment.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly usersService: UsersService,
  ) { }

  async create(userId: number, data: Partial<Payment>): Promise<Payment> {
    await this.usersService.findOne(userId);
    return this.paymentsRepository.create(data);
  }
}

