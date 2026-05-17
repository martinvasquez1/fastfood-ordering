import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { User } from 'src/common/decorators/user.decorator';

import { PaymentsService } from './payments.service';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post()
  @ApiOperation({ operationId: 'postPayments' })
  async create(@User('id') userId: number, @Body() body: Partial<Payment>): Promise<Payment> {
    return this.paymentsService.create(userId, body);
  }
}
