import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { SignUpDto } from './signUp.dto';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

enum VehicleType {
    CAR = 'car',
    MOTORCYCLE = 'motorcycle',
    BICYCLE = 'bicycle',
}

export class SignUpDriverDto extends PartialType(SignUpDto) {
    @IsString()
    @Length(12, 12)
    rut: number;

    @IsEnum(VehicleType)
    vehicleType: VehicleType;

    @IsString()
    @Length(6, 6)
    plateNumber: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    identityDocument?: any;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    drivingLicense?: any;
}

export class SignUpDriverDtoWithPaths extends SignUpDriverDto {
    identityDocumentPath?: string; 
    drivingLicensePath?: string; 
}