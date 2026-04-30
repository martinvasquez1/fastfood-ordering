import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role, RoleType } from './role.entity';
import { UserRole } from './user-role.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role) private roleORM: Repository<Role>,
    @InjectRepository(UserRole) private userRoleORM: Repository<UserRole>
  ) { }

  async findByName(name: RoleType): Promise<Role | null> {
    return this.roleORM.findOne({ where: { name } });
  };

  async createUserRole(user: User, role: Role): Promise<UserRole> {
    const userRole = this.userRoleORM.create({ user, role });
    return this.userRoleORM.save(userRole);
  }
}