import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { MenuItem } from "src/menu/menu-item.entity";

@Entity("restaurant_stock")
@Unique(["restaurantId", "menuItemId"])
export class RestaurantStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurantId: number;

  @Column()
  menuItemId: number;

  @ManyToOne(() => Restaurant, { onDelete: "CASCADE" })
  @JoinColumn({ name: "restaurantId" })
  restaurant: Restaurant;

  @ManyToOne(() => MenuItem, { onDelete: "CASCADE" })
  @JoinColumn({ name: "menuItemId" })
  menuItem: MenuItem;

  @Column({ type: "int", nullable: false })
  quantity: number;
}