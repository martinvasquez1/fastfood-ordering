import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { SignUpDriverDto, SignUpDriverDtoWithPaths } from './dto/sign-up-driver';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';

import { ApiGenericBadRequestResponse } from 'src/common/decorators/bad-request-response';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MultiFileValidationPipe } from 'src/common/pipes/multi-file-validation-pipe';
import { UpdateUserDtoWithPaths } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @ApiGenericBadRequestResponse()
  @ApiOperation({ operationId: 'signUp' })
  signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }


  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up-admin')
  @ApiGenericBadRequestResponse()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'identityDocument', maxCount: 1 },
        { name: 'drivingLicense', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/users',
          filename: (req, file, cb) => {
            const unique = Date.now();
            const name = `${file.fieldname}-${unique}${extname(file.originalname)}`;
            cb(null, name);
          },
        }),
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ operationId: 'signUpDriver' })
  signUpAdmin(
    @Body() signUpDto: SignUpDriverDto,
    @UploadedFiles(
      new MultiFileValidationPipe([
        new FileTypeValidator({ fileType: /^image\/(png|jpeg)$/ }),
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
      ]),
    ) files?: { identityDocument: Express.Multer.File[], drivingLicense: Express.Multer.File[] }
  ) {
    const dto: SignUpDriverDtoWithPaths = {
      ...signUpDto,
      identityDocumentPath: files?.drivingLicense?.[0]?.path,
      drivingLicensePath: files?.identityDocument?.[0]?.path,
    }

    return this.authService.signUpDriver(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiOperation({ operationId: 'signIn' })
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  }
}
