import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Driver, DriverStatus, VehicleType } from './driver.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DriverRepository {
  constructor(@InjectRepository(Driver) private readonly ORM: Repository<Driver>) { }

  async create(data: {
    user: User;
    RUT: string;
    identityDocument: string;
    drivingLicense: string;
    vehicleType: VehicleType;
    plateNumber?: string;
  }): Promise<Driver> {
    const driver = this.ORM.create({
      id: data.user.id,
      user: data.user,
      RUT: data.RUT,
      identityDocument: data.identityDocument,
      drivingLicense: data.drivingLicense,
      vehicleType: data.vehicleType,
      plateNumber: data.plateNumber,
      status: DriverStatus.OFFLINE,
      isVerified: false,
    });

    return this.ORM.save(driver);
  }
}
