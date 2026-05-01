import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { User } from 'src/users/entities/user.entity';

export enum VehicleType {
  CAR = 'car',
  MOTORCYCLE = 'motorcycle',
  BICYCLE = 'bicycle',
}

export enum DriverStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  OFFLINE = 'offline',
}

@Entity('drivers')
export class Driver {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => User, (user) => user.driver, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  user: User;

  @Column({ type: 'varchar', length: 12 })
  RUT: string;

  @Column({ type: 'text' })
  identityDocument: string;

  @Column({ type: 'text' })
  drivingLicense: string;

  @Column({ type: 'enum', enum: VehicleType })
  vehicleType: VehicleType;

  @Column({ type: 'varchar', length: 15, nullable: true })
  plateNumber: string;

  @Column({ type: 'enum', enum: DriverStatus })
  status: DriverStatus;

  @Column({ type: 'bool', default: false })
  isVerified: boolean;
}
