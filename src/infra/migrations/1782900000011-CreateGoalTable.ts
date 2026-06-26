import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGoalTable1782900000011 implements MigrationInterface {
  name = "CreateGoalTable1782900000011";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "goal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "target_amount" numeric(14,2) NOT NULL, "current_amount" numeric(14,2) NOT NULL DEFAULT '0', "target_date" date, "funding_account_id" uuid, "achieved" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_goal" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ADD CONSTRAINT "FK_goal_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ADD CONSTRAINT "FK_goal_funding_account_id" FOREIGN KEY ("funding_account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "goal" DROP CONSTRAINT "FK_goal_funding_account_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" DROP CONSTRAINT "FK_goal_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "goal"`);
  }
}
