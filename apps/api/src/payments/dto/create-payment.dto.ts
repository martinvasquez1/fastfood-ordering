import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  holderName: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 5)
  expires: string;
}
