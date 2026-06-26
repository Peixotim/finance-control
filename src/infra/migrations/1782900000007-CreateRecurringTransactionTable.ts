import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecurringTransactionTable1782900000007
  implements MigrationInterface
{
  name = "CreateRecurringTransactionTable1782900000007";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_transaction_type_enum" AS ENUM('income', 'expense', 'transfer')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_transaction_frequency_enum" AS ENUM('daily', 'weekly', 'monthly', 'yearly')`,
    );
    await queryRunner.query(
      `CREATE TABLE "recurring_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "account_id" uuid NOT NULL, "category_id" uuid, "description" character varying(255) NOT NULL, "amount" numeric(14,2) NOT NULL, "type" "public"."recurring_transaction_type_enum" NOT NULL, "frequency" "public"."recurring_transaction_frequency_enum" NOT NULL, "next_run_date" date NOT NULL, "end_date" date, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_recurring_transaction" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_transaction" ADD CONSTRAINT "FK_recurring_transaction_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_transaction" ADD CONSTRAINT "FK_recurring_transaction_account_id" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_transaction" ADD CONSTRAINT "FK_recurring_transaction_category_id" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recurring_transaction" DROP CONSTRAINT "FK_recurring_transaction_category_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_transaction" DROP CONSTRAINT "FK_recurring_transaction_account_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_transaction" DROP CONSTRAINT "FK_recurring_transaction_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "recurring_transaction"`);
    await queryRunner.query(
      `DROP TYPE "public"."recurring_transaction_frequency_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."recurring_transaction_type_enum"`,
    );
  }
}
