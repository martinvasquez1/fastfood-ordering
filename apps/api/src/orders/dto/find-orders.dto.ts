import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { OrderStatus } from '../order.entity';
import { Type } from 'class-transformer';

export class FindOrdersDto {
  @IsOptional()
  @IsEnum(OrderStatus, { message: 'Invalid order status' })
  status?: OrderStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Must be an integer' })
  userId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Must be an integer' })
  driverId?: number;
}