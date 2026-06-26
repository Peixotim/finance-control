import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAndRecreateHouseholdTables1782900000002
  implements MigrationInterface
{
  name = "DropAndRecreateHouseholdTables1782900000002";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop old broken tables (member first due to FK dependency)
    await queryRunner.query(
      `ALTER TABLE "house_hold_member" DROP CONSTRAINT "FK_1546690f31895c80f6b6bcaf6fd"`,
    );
    await queryRunner.query(`DROP TABLE "house_hold_member"`);
    await queryRunner.query(
      `DROP TYPE "public"."house_hold_member_roles_enum"`,
    );
    await queryRunner.query(`DROP TABLE "house_hold"`);

    // Create household
    await queryRunner.query(
      `CREATE TABLE "household" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_household" PRIMARY KEY ("id"))`,
    );

    // Create household_member with corrected enum, user_id FK and unique constraint
    await queryRunner.query(
      `CREATE TYPE "public"."household_member_role_enum" AS ENUM('owner', 'member')`,
    );
    await queryRunner.query(
      `CREATE TABLE "household_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "household_id" uuid NOT NULL, "role" "public"."household_member_role_enum" NOT NULL DEFAULT 'member', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_household_member_user_household" UNIQUE ("user_id", "household_id"), CONSTRAINT "PK_household_member" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "household_member" ADD CONSTRAINT "FK_household_member_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "household_member" ADD CONSTRAINT "FK_household_member_household_id" FOREIGN KEY ("household_id") REFERENCES "household"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "household_member" DROP CONSTRAINT "FK_household_member_household_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "household_member" DROP CONSTRAINT "FK_household_member_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "household_member"`);
    await queryRunner.query(
      `DROP TYPE "public"."household_member_role_enum"`,
    );
    await queryRunner.query(`DROP TABLE "household"`);

    // Restore old tables
    await queryRunner.query(
      `CREATE TABLE "house_hold" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e7f3f7e2cdda2a9c575a2e6d219" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."house_hold_member_roles_enum" AS ENUM('OWNER', 'ADMIN', 'MEMBER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "house_hold_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "roles" "public"."house_hold_member_roles_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "houseHoldId" uuid, CONSTRAINT "PK_6c4fdc2775732854e67180aa2cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "house_hold_member" ADD CONSTRAINT "FK_1546690f31895c80f6b6bcaf6fd" FOREIGN KEY ("houseHoldId") REFERENCES "house_hold"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
