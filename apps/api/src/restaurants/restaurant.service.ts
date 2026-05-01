import { Injectable } from '@nestjs/common';
import { RestaurantsRepository } from './restaurant.repository';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) { }

  async findAll() {}
}