import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';

import { VehicleType } from 'src/drivers/driver.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class SignUpDriverDto extends CreateUserDto {
    @IsString()
    @Length(12, 12)
    RUT: string;

    @IsEnum(VehicleType)
    vehicleType: VehicleType;

    @IsString()
    @Length(6, 6)
    plateNumber: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    identityDocument: any;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    drivingLicense: any;
}

export class SignUpDriverDtoWithPaths extends SignUpDriverDto {
    declare identityDocument: string; 
    declare drivingLicense: string; 
}