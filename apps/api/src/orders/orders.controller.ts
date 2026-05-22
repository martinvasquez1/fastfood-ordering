import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MultiFileValidationPipe } from 'src/common/pipes/multi-file-validation-pipe';

import { OrdersService } from './order.service';

import { Order, OrderStatus } from './order.entity';
import { User } from 'src/common/decorators/user.decorator';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    @ApiOperation({ operationId: 'postOrder' })
    async create(@User('id') userId: number, @Body() dto: CreateOrderDto): Promise<Order> {
        return this.ordersService.createOrder(userId, dto);
    }

    @Get()
    @ApiOperation({ operationId: 'getOrders' })
    async findAll(@Query() query: FindOrdersDto): Promise<Order[]> {
        return this.ordersService.getOrders(query.userId, query.driverId, query.status);
    }

    @Get(':id')
    @ApiOperation({ operationId: 'getOrder' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order | null> {
        return this.ordersService.getOrder(id);
    }

    @Patch(':id')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'proofOfDelivery', maxCount: 1 },
            ],
            {
                storage: diskStorage({
                    destination: './uploads/orders',
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
    @ApiOperation({ operationId: 'updateOrder' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOrderDto,
        @UploadedFiles(
            new MultiFileValidationPipe([
                new FileTypeValidator({ fileType: /^image\/(png|jpeg)$/ }),
                new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            ]),
        )
        files?: { proofOfDelivery?: Express.Multer.File[] },
    ) {
        const proofOfDelivery = files?.proofOfDelivery?.[0]?.path ?? null;
        return this.ordersService.update(+id, dto, proofOfDelivery);
    }
}