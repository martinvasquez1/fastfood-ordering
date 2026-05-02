import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { MenuItem } from "./menu-item.entity";

@Entity("menu_categories")
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.menuCategory)
  menuItems: MenuItem[];
}