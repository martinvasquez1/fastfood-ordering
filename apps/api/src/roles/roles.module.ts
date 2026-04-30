import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from 'src/roles/role.entity';
import { UserRole } from 'src/roles/user-role.entity';

import { RolesRepository } from './roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRole])],
  providers: [RolesRepository],
  exports: [RolesRepository],
})
export class UsersModule {}
