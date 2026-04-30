import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role, RoleType } from './role.entity';

@Injectable()
export class RolesRepository {
  constructor(@InjectRepository(Role) private ORM: Repository<Role>) { }

  async findByName(name: RoleType): Promise<Role | null> {
    return this.ORM.findOne({ where: { name } });
  };
}