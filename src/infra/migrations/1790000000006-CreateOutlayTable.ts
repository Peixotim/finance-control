import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOutlayTable1790000000006 implements MigrationInterface {
  name = "CreateOutlayTable1790000000006";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "outlay" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "category_id" uuid, "description" character varying(255), "amount" numeric(14,2) NOT NULL, "date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_outlay" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_outlay_user_id_date" ON "outlay" ("user_id", "date")`,
    );
    await queryRunner.query(
      `ALTER TABLE "outlay" ADD CONSTRAINT "FK_outlay_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "outlay" ADD CONSTRAINT "FK_outlay_category_id" FOREIGN KEY ("category_id") REFERENCES "outlay_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "outlay" DROP CONSTRAINT "FK_outlay_category_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "outlay" DROP CONSTRAINT "FK_outlay_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_outlay_user_id_date"`);
    await queryRunner.query(`DROP TABLE "outlay"`);
  }
}
