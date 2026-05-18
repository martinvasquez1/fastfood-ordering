import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { OrdersRepository } from './orders.repository';
import { MenuItemsRepository } from 'src/menu/menu-item.repository';

import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { DeepPartial } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  private checkStatusTransition(currentStatus: OrderStatus, nextStatus: OrderStatus, imagePath?: string | null) {
    if (nextStatus && nextStatus !== currentStatus) {
      const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
        [OrderStatus.PENDING]: [
          OrderStatus.PREPARING,
          OrderStatus.CANCELLED,
        ],

        [OrderStatus.PREPARING]: [
          OrderStatus.AWAITING_PICKUP,
          OrderStatus.CANCELLED,
        ],

        [OrderStatus.AWAITING_PICKUP]: [
          OrderStatus.ON_THE_WAY,
          OrderStatus.CANCELLED,
        ],

        [OrderStatus.ON_THE_WAY]: [
          OrderStatus.DELIVERED,
          OrderStatus.CANCELLED,
        ],

        [OrderStatus.DELIVERED]: [],

        [OrderStatus.CANCELLED]: [],
      };

      const isValidTransition = allowedTransitions[currentStatus]?.includes(nextStatus);
      if (!isValidTransition) {
        throw new BadRequestException(`Cannot change order status from ${currentStatus} to ${nextStatus}`);
      }

      if (nextStatus === OrderStatus.DELIVERED && !imagePath) {
        throw new BadRequestException('Proof of delivery image is required when marking order as delivered');
      }
    }
  }

  async update(id: number, dto: UpdateOrderDto, imagePath?: string | null) {
    const order = await this.ordersRepository.findOneById(id);
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);

    const currentStatus = order.status;
    const nextStatus = dto.status;
    this.checkStatusTransition(currentStatus, nextStatus);

    Object.assign(order, dto);

    const isThereProofOfDelivery = imagePath !== undefined;
    if (isThereProofOfDelivery) order.proofOfDelivery = imagePath;

    const updatedOrder = await this.ordersRepository.save(order);

    return updatedOrder;
  }
}