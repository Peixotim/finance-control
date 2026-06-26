import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUsersTable1782900000001 implements MigrationInterface {
  name = "AlterUsersTable1782900000001";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "passwordHash" TO "password_hash"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "phone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "password_hash" TO "passwordHash"`,
    );
  }
}
