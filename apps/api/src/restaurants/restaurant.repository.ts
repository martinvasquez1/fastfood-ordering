import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantsRepository {
  constructor(@InjectRepository(Restaurant) private ORM: Repository<Restaurant>) { }

  async findAll(id: number) {
    return await this.ORM.find();
  }
}
