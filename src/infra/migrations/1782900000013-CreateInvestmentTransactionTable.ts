import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvestmentTransactionTable1782900000013
  implements MigrationInterface
{
  name = "CreateInvestmentTransactionTable1782900000013";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."investment_transaction_operation_enum" AS ENUM('buy', 'sell', 'dividend')`,
    );
    await queryRunner.query(
      `CREATE TABLE "investment_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "investment_id" uuid NOT NULL, "operation" "public"."investment_transaction_operation_enum" NOT NULL, "quantity" numeric(14,6) NOT NULL, "unit_price" numeric(14,6) NOT NULL, "date" date NOT NULL, "fees" numeric(14,2), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_investment_transaction" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment_transaction" ADD CONSTRAINT "FK_investment_transaction_investment_id" FOREIGN KEY ("investment_id") REFERENCES "investment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment_transaction" DROP CONSTRAINT "FK_investment_transaction_investment_id"`,
    );
    await queryRunner.query(`DROP TABLE "investment_transaction"`);
    await queryRunner.query(
      `DROP TYPE "public"."investment_transaction_operation_enum"`,
    );
  }
}
