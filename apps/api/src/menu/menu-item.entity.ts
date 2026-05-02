import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { MenuCategory } from "./menu-category.entity";

@Entity("menu_items")
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menuCategoryId: number;

  @ManyToOne(() => MenuCategory, (category) => category.menuItems, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "menuCategoryId" })
  menuCategory: MenuCategory;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  description: string;

  @Column({ type: "int" })
  price: number;
}