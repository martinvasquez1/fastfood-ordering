import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import { OrdersRepository } from './orders.repository';
import { MenuItemsRepository } from 'src/menu/menu-item.repository';
import { RestaurantsRepository } from 'src/restaurants/restaurant.repository';

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
    private readonly restaurantRepository: RestaurantsRepository,
  ) { }

  async createOrder(userId: number, dto: CreateOrderDto): Promise<Order> {
    // Load menu items from DB
    const menuItems = await this.menuItemsRepository.findByIds(
      dto.items.map((i) => i.menuItemId),
    );

    // Check stock
    for (const [index, menuItem] of menuItems.entries()) {
      const item = await this.restaurantRepository.getRestaruantStock(dto.restaurantId, menuItem.id);
      if (!item) throw new NotFoundException(`Item with ID ${menuItem.id} not found`);

      const availableStock = item.quantity;
      const isThereEnoughStock = availableStock >= dto.items[index]!.quantity;

      if (!isThereEnoughStock) throw new BadRequestException(`Insufficient stock for menu item ${item.id}. Only ${availableStock} items are available.`);
    }

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

    // Update stock
    for (const item of dto.items) {
      await this.restaurantRepository.updateRestaurantStock(
        dto.restaurantId,
        item.menuItemId,
        item.quantity,
      );
    }

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

    // If setting driver, then PREPARING
    if (dto.driverId && !order.driverId) {
      dto.status = OrderStatus.PREPARING;
    }

    validateTransition(order.status, dto.status);

    Object.assign(order, dto);
    if (imagePath !== undefined) order.proofOfDelivery = imagePath;

    const updatedOrder = await this.ordersRepository.save(order);
    return updatedOrder;
  }

  @Interval(30000)
  async handlePreparingToPickup() {
    await this.ordersRepository.markPreparingOrdersAsAwaitingPickup();
  }
}