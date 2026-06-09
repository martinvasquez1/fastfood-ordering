import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentExpireLen1778986469676 implements MigrationInterface {
    name = 'PaymentExpireLen1778986469676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "cardNumber" character varying(20) NOT NULL, "holderName" character varying(50) NOT NULL, "expires" character varying(5) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
