import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { User } from 'src/common/decorators/user.decorator';

import { PaymentsService } from './payments.service';
import { Payment } from './payment.entity';

import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post()
  @ApiOperation({ operationId: 'postPayments' })
  async create(@User('id') userId: number, @Body() createHabitDto: CreatePaymentDto): Promise<Payment> {
    const newDto = { ...createHabitDto, cardNumber: createHabitDto.cardNumber?.slice(-4) };
    return this.paymentsService.create(userId, newDto);
  }

  @Get()
  @ApiOperation({ operationId: 'getPayments' })
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }
}
