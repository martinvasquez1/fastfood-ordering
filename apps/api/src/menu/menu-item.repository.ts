import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity';

@Injectable()
export class MenuItemsRepository {
    constructor(
        @InjectRepository(MenuItem) private readonly ORM: Repository<MenuItem>,
    ) { }

    async findByIds(ids: number[]): Promise<MenuItem[]> {
        return this.ORM.find({
            where: {
                id: In(ids),
            },
        });
    }

    async findById(id: number): Promise<MenuItem | null> {
        return this.ORM.findOne({
            where: { id },
        });
    }
}