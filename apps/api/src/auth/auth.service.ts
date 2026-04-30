import { ConsoleLogger, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RolesRepository } from 'src/roles/roles.repository';
import { DriverRepository } from 'src/drivers/driver.repository';

import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/entities/user.entity';
import { SignUpDriverDtoWithPaths } from './dto/sign-up-driver';
import { RoleType } from 'src/roles/role.entity';

type Response = {
  accessToken: string;
  userId: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesRepository: RolesRepository,
    private readonly driversRepository: DriverRepository,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(user: User) {
    const { username, id } = user;
    const payload = { sub: user.id, username, id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async signUp(signUpDto: SignUpDto): Promise<Response> {
    const newUser = await this.usersService.create(signUpDto);
    const accessToken = await this.generateToken(newUser);
    return { accessToken, userId: newUser.id };
  }

  async signUpDriver(dto: SignUpDriverDtoWithPaths): Promise<Response> {
    const driverRole = await this.rolesRepository.findByName(RoleType.DRIVER);
    if (!driverRole) throw new Error('DRIVER role not found');

    const newUser = await this.usersService.create(dto);
    this.rolesRepository.createUserRole(newUser, driverRole);

    const driverData = { ...dto, user: newUser  }
    this.driversRepository.create(driverData)

    const accessToken = await this.generateToken(newUser);
    return { accessToken, userId: newUser.id };
  }

  async signIn(signInDto: SignInDto): Promise<Response> {
    const user = await this.usersService.findByEmail(signInDto.email);

    const isWrongPassword = !(await bcrypt.compare(
      signInDto.password,
      user.password,
    ));
    if (isWrongPassword) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.generateToken(user);
    return { accessToken, userId: user.id };
  }
}
