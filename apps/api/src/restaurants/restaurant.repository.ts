import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ILike, Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { PageOptions } from 'src/common/pagination/page-options.dto';

@Injectable()
export class RestaurantsRepository {
  constructor(@InjectRepository(Restaurant) private ORM: Repository<Restaurant>) { }

  async findAll(
    pageOptions: PageOptions,
    address?: string,
  ): Promise<[Restaurant[], number]> {
    const { page, take } = pageOptions;

    const where = address ? { address: ILike(`%${address}%`) } : {};
    const result = this.ORM.findAndCount({
      where,
      skip: (page - 1) * take,
      take,
      order: { id: 'ASC' },
    });

    return result;
  }
}
