import { BadRequestException, Injectable } from '@nestjs/common';

import { OrdersRepository } from './orders.repository';
import { MenuItemsRepository } from 'src/menu/menu-item.repository';

import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly menuItemsRepository: MenuItemsRepository,
  ) { }

  async createOrder(userId: number, dto: CreateOrderDto): Promise<Order> {
    // Load menu items from DB
    const menuItems = await this.menuItemsRepository.findByIds(
      dto.items.map((i) => i.menuItemId),
    );

    const someItemsDoNotExist = menuItems.length !== dto.items.length;
    if (someItemsDoNotExist) throw new BadRequestException('Some menu items do not exist');

    const menuMap = new Map(menuItems.map((item) => [item.id, item]));

    let totalPrice = 0;
    const orderItems = dto.items.map((item) => {
      const menuItem = menuMap.get(item.menuItemId);
      if (!menuItem) throw new BadRequestException(`Menu item ${item.menuItemId} not found`);

      const unitPrice = menuItem.price;
      const subtotal = unitPrice * item.quantity;
      totalPrice += subtotal;

      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      };
    });

    const order: DeepPartial<Order> = {
      userId,
      restaurantId: dto.restaurantId,
      shippingAddress: dto.shippingAddress,
      status: OrderStatus.PENDING,
      totalPrice,
      items: orderItems,
    };

    return this.ordersRepository.createOrder(order);
  }
}