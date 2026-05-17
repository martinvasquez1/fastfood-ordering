import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Payment } from './payment.entity';
import { UsersModule } from 'src/users/users.module';

import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './payments.repository';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), UsersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
})
export class PaymentsModule {}
