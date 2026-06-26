import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvestmentTable1782900000012 implements MigrationInterface {
  name = "CreateInvestmentTable1782900000012";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."investment_asset_type_enum" AS ENUM('stock', 'fii', 'crypto', 'fixed_income', 'fund')`,
    );
    await queryRunner.query(
      `CREATE TABLE "investment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "ticker" character varying(20) NOT NULL, "name" character varying NOT NULL, "asset_type" "public"."investment_asset_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_investment_user_ticker" UNIQUE ("user_id", "ticker"), CONSTRAINT "PK_investment" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "investment" ADD CONSTRAINT "FK_investment_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investment" DROP CONSTRAINT "FK_investment_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "investment"`);
    await queryRunner.query(`DROP TYPE "public"."investment_asset_type_enum"`);
  }
}
