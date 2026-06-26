import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBudgetTable1782900000010 implements MigrationInterface {
  name = "CreateBudgetTable1782900000010";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "budget" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "category_id" uuid NOT NULL, "limit_amount" numeric(14,2) NOT NULL, "month" character varying(7) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_budget_user_category_month" UNIQUE ("user_id", "category_id", "month"), CONSTRAINT "PK_budget" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget" ADD CONSTRAINT "FK_budget_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget" ADD CONSTRAINT "FK_budget_category_id" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "budget" DROP CONSTRAINT "FK_budget_category_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "budget" DROP CONSTRAINT "FK_budget_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "budget"`);
  }
}
