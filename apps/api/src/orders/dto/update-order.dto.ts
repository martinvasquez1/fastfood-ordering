import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { OrderStatus } from '../order.entity';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  driverId: number;
}