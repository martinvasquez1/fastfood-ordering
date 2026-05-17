import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { CreateUserPolicy } from 'src/users/policies/create-user-policy';
import { CaslModule } from 'src/casl/casl.module';
import { RolesModule } from 'src/roles/roles.module';
import { DriversModule } from 'src/drivers/drivers.module';
import { OrdersModule } from 'src/orders/orders.module';
import { MenuModule } from 'src/menu/menu.module';
import { RestaurantsModule } from 'src/restaurants/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
    CaslModule,
    UsersModule,
    RolesModule,
    DriversModule,
    OrdersModule,
    MenuModule,
    RestaurantsModule,
  ],
  controllers: [AuthController],
  providers: [CreateUserPolicy, AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
