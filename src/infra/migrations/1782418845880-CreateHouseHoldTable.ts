import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHouseHoldTable1782418845880 implements MigrationInterface {
    name = 'CreateHouseHoldTable1782418845880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "house_hold" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e7f3f7e2cdda2a9c575a2e6d219" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "house_hold"`);
    }

}
