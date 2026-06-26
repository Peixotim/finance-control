import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCreditCardInvoiceTable1782900000005
  implements MigrationInterface
{
  name = "CreateCreditCardInvoiceTable1782900000005";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."credit_card_invoice_status_enum" AS ENUM('open', 'closed', 'paid', 'overdue')`,
    );
    await queryRunner.query(
      `CREATE TABLE "credit_card_invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_id" uuid NOT NULL, "closing_date" date NOT NULL, "due_date" date NOT NULL, "total" numeric(14,2) NOT NULL DEFAULT '0', "status" "public"."credit_card_invoice_status_enum" NOT NULL DEFAULT 'open', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_credit_card_invoice" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "credit_card_invoice" ADD CONSTRAINT "FK_credit_card_invoice_account_id" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "credit_card_invoice" DROP CONSTRAINT "FK_credit_card_invoice_account_id"`,
    );
    await queryRunner.query(`DROP TABLE "credit_card_invoice"`);
    await queryRunner.query(
      `DROP TYPE "public"."credit_card_invoice_status_enum"`,
    );
  }
}
