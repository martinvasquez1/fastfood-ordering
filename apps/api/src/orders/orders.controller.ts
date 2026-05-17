import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { Order } from './order.entity';

import { OrdersService } from './order.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @ApiOperation({ operationId: 'postOrder' })
    async create(@User('id') userId: number, @Body() dto: CreateOrderDto): Promise<Order> {
        return this.ordersService.createOrder(userId, dto);
    }
}