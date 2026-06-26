import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInstallmentTable1782900000009 implements MigrationInterface {
  name = "CreateInstallmentTable1782900000009";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "installment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transaction_id" uuid NOT NULL, "number" smallint NOT NULL, "amount" numeric(14,2) NOT NULL, "due_date" date NOT NULL, "paid" boolean NOT NULL DEFAULT false, "paid_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_installment" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment" ADD CONSTRAINT "FK_installment_transaction_id" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "installment" DROP CONSTRAINT "FK_installment_transaction_id"`,
    );
    await queryRunner.query(`DROP TABLE "installment"`);
  }
}
