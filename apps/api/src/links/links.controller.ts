import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { LinksService } from './links.service';

@Controller('links')
export class LinksController {}
