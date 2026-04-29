import { MigrationInterface, QueryRunner } from "typeorm";

export class Driver1777492891957 implements MigrationInterface {
    name = 'Driver1777492891957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."drivers_vehicletype_enum" AS ENUM('car', 'motorcycle')`);
        await queryRunner.query(`CREATE TYPE "public"."drivers_status_enum" AS ENUM('available', 'busy', 'offline')`);
        await queryRunner.query(`CREATE TABLE "drivers" ("id" integer NOT NULL, "RUT" character varying(12) NOT NULL, "identityDocument" text NOT NULL, "drivingLicense" text NOT NULL, "vehicleType" "public"."drivers_vehicletype_enum" NOT NULL, "plateNumber" character varying(15), "status" "public"."drivers_status_enum" NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."roles_name_enum" AS ENUM('driver')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" "public"."roles_name_enum" NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userRoles" ("id" SERIAL NOT NULL, "userId" integer, "roleId" integer, CONSTRAINT "PK_f51275374b5fb007ccf0fff9806" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_046d21329e72c0aedd207bbcdb" ON "userRoles" ("userId", "roleId") `);
        await queryRunner.query(`ALTER TABLE "drivers" ADD CONSTRAINT "FK_92ab3fb69e566d3eb0cae896047" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userRoles" ADD CONSTRAINT "FK_fdf65c16d62910b4785a18cdfce" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userRoles" ADD CONSTRAINT "FK_5760f2a1066eb90b4c223c16a10" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userRoles" DROP CONSTRAINT "FK_5760f2a1066eb90b4c223c16a10"`);
        await queryRunner.query(`ALTER TABLE "userRoles" DROP CONSTRAINT "FK_fdf65c16d62910b4785a18cdfce"`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP CONSTRAINT "FK_92ab3fb69e566d3eb0cae896047"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_046d21329e72c0aedd207bbcdb"`);
        await queryRunner.query(`DROP TABLE "userRoles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
        await queryRunner.query(`DROP TYPE "public"."drivers_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."drivers_vehicletype_enum"`);
    }

}
