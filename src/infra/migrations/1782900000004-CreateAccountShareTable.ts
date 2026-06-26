import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccountShareTable1782900000004
  implements MigrationInterface
{
  name = "CreateAccountShareTable1782900000004";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account_share" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_id" uuid NOT NULL, "household_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_account_share_account_household" UNIQUE ("account_id", "household_id"), CONSTRAINT "PK_account_share" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_share" ADD CONSTRAINT "FK_account_share_account_id" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_share" ADD CONSTRAINT "FK_account_share_household_id" FOREIGN KEY ("household_id") REFERENCES "household"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account_share" DROP CONSTRAINT "FK_account_share_household_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_share" DROP CONSTRAINT "FK_account_share_account_id"`,
    );
    await queryRunner.query(`DROP TABLE "account_share"`);
  }
}
