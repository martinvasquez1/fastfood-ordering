import { MigrationInterface, QueryRunner } from "typeorm";

export class RestaurantStock1777683717954 implements MigrationInterface {
    name = 'RestaurantStock1777683717954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menu_categories" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_124ae987900336f983881cb04e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_items" ("id" SERIAL NOT NULL, "menuCategoryId" integer NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_57e6188f929e5dc6919168620c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurant_stock" ("id" SERIAL NOT NULL, "restaurantId" integer NOT NULL, "menuItemId" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "UQ_00cc0608a1cad3bd7c582960835" UNIQUE ("restaurantId", "menuItemId"), CONSTRAINT "PK_7f1656836a5d7e60468de28020e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu_items" ADD CONSTRAINT "FK_2129be505f685946376ace6707c" FOREIGN KEY ("menuCategoryId") REFERENCES "menu_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_stock" ADD CONSTRAINT "FK_2b4cdd89a29f5adc65e6b465427" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_stock" ADD CONSTRAINT "FK_69f0864ecb9b4a6db14cb54fcd0" FOREIGN KEY ("menuItemId") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_stock" DROP CONSTRAINT "FK_69f0864ecb9b4a6db14cb54fcd0"`);
        await queryRunner.query(`ALTER TABLE "restaurant_stock" DROP CONSTRAINT "FK_2b4cdd89a29f5adc65e6b465427"`);
        await queryRunner.query(`ALTER TABLE "menu_items" DROP CONSTRAINT "FK_2129be505f685946376ace6707c"`);
        await queryRunner.query(`DROP TABLE "restaurant_stock"`);
        await queryRunner.query(`DROP TABLE "menu_items"`);
        await queryRunner.query(`DROP TABLE "menu_categories"`);
    }

}
