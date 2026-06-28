import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIncomeTypeTable1790000000003 implements MigrationInterface {
  name = "CreateIncomeTypeTable1790000000003";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "income_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(40) NOT NULL, "label" character varying(80) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_income_type_code" UNIQUE ("code"), CONSTRAINT "PK_income_type" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "income_type"`);
  }
}
