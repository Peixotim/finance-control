import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOutlayCategoryTable1790000000004 implements MigrationInterface {
  name = "CreateOutlayCategoryTable1790000000004";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "outlay_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying(80) NOT NULL, "outlay_type_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_outlay_category_user_id_name" UNIQUE ("user_id", "name"), CONSTRAINT "PK_outlay_category" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "outlay_category" ADD CONSTRAINT "FK_outlay_category_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "outlay_category" ADD CONSTRAINT "FK_outlay_category_outlay_type_id" FOREIGN KEY ("outlay_type_id") REFERENCES "outlay_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "outlay_category" DROP CONSTRAINT "FK_outlay_category_outlay_type_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "outlay_category" DROP CONSTRAINT "FK_outlay_category_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "outlay_category"`);
  }
}
