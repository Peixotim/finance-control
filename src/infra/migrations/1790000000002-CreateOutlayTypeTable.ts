import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOutlayTypeTable1790000000002 implements MigrationInterface {
  name = "CreateOutlayTypeTable1790000000002";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "outlay_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(40) NOT NULL, "label" character varying(80) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_outlay_type_code" UNIQUE ("code"), CONSTRAINT "PK_outlay_type" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "outlay_type"`);
  }
}
