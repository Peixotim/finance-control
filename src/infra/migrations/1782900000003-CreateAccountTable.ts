import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccountTable1782900000003 implements MigrationInterface {
  name = "CreateAccountTable1782900000003";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."account_type_enum" AS ENUM('checking', 'savings', 'wallet', 'credit_card', 'investment')`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "type" "public"."account_type_enum" NOT NULL, "balance" numeric(14,2) NOT NULL DEFAULT '0', "currency" character varying(3) NOT NULL DEFAULT 'BRL', "credit_limit" numeric(14,2), "closing_day" smallint, "due_day" smallint, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_account" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_account_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_account_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TYPE "public"."account_type_enum"`);
  }
}
