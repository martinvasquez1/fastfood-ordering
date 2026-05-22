import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { OrdersRepository } from './orders.repository';
import { MenuItemsRepository } from 'src/menu/menu-item.repository';

import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeepPartial } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { validateTransition } from './order-state-machine';

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

  async getOrders(userId?: number, driverId?: number, status?: OrderStatus): Promise<Order[]> {
    return await this.ordersRepository.findAll(userId, driverId, status)
  }

  async getOrder(orderId): Promise<Order | null> {
    return await this.ordersRepository.findOneById(orderId)
  }

  async update(id: number, dto: UpdateOrderDto, imagePath?: string | null) {
    const order = await this.ordersRepository.findOneById(id);
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);

    validateTransition(order.status, dto.status);

    Object.assign(order, dto);
    if (imagePath !== undefined) order.proofOfDelivery = imagePath;

    const updatedOrder = await this.ordersRepository.save(order);
    return updatedOrder;
  }
}