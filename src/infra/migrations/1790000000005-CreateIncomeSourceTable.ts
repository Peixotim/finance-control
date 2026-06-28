import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIncomeSourceTable1790000000005 implements MigrationInterface {
  name = "CreateIncomeSourceTable1790000000005";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "income_source" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying(80) NOT NULL, "description" character varying(255), "income_type_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_income_source_user_id_name" UNIQUE ("user_id", "name"), CONSTRAINT "PK_income_source" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_source" ADD CONSTRAINT "FK_income_source_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_source" ADD CONSTRAINT "FK_income_source_income_type_id" FOREIGN KEY ("income_type_id") REFERENCES "income_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "income_source" DROP CONSTRAINT "FK_income_source_income_type_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income_source" DROP CONSTRAINT "FK_income_source_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "income_source"`);
  }
}
