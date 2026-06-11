import { MigrationInterface, QueryRunner } from "typeorm";

export class MenuItemImage1780934813629 implements MigrationInterface {
    name = 'MenuItemImage1780934813629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_items" ADD "image" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_items" DROP COLUMN "image"`);
    }

}
