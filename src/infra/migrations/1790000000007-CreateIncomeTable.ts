import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIncomeTable1790000000007 implements MigrationInterface {
  name = "CreateIncomeTable1790000000007";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "income" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "income_source_id" uuid, "description" character varying(255), "amount" numeric(14,2) NOT NULL, "received_at" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_income" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_income_user_id_received_at" ON "income" ("user_id", "received_at")`,
    );
    await queryRunner.query(
      `ALTER TABLE "income" ADD CONSTRAINT "FK_income_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "income" ADD CONSTRAINT "FK_income_income_source_id" FOREIGN KEY ("income_source_id") REFERENCES "income_source"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "income" DROP CONSTRAINT "FK_income_income_source_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "income" DROP CONSTRAINT "FK_income_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_income_user_id_received_at"`);
    await queryRunner.query(`DROP TABLE "income"`);
  }
}
