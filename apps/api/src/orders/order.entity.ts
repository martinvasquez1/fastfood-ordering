import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Driver } from 'src/drivers/driver.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  // Created by the user
  PENDING = 'pending',

  // Changes to PREPARING only when driver accepts
  PREPARING = 'preparing',
  AWAITING_PICKUP = 'awaiting_pickup',

  ON_THE_WAY = 'on_the_way',
  DELIVERED = 'delivered',

  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  driverId?: number;

  @ManyToOne(() => Driver, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'driverId' })
  driver?: Driver;

  @Column()
  restaurantId: number;

  @ManyToOne(() => Restaurant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'text' })
  shippingAddress: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'int' })
  totalPrice: number;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'text', nullable: true })
  proofOfDelivery: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}