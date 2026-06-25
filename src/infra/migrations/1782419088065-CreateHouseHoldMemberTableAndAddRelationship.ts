import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHouseHoldMemberTableAndAddRelationship1782419088065 implements MigrationInterface {
    name = 'CreateHouseHoldMemberTableAndAddRelationship1782419088065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."house_hold_member_roles_enum" AS ENUM('OWNER', 'ADMIN', 'MEMBER')`);
        await queryRunner.query(`CREATE TABLE "house_hold_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "roles" "public"."house_hold_member_roles_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "houseHoldId" uuid, CONSTRAINT "PK_6c4fdc2775732854e67180aa2cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "house_hold_member" ADD CONSTRAINT "FK_1546690f31895c80f6b6bcaf6fd" FOREIGN KEY ("houseHoldId") REFERENCES "house_hold"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "house_hold_member" DROP CONSTRAINT "FK_1546690f31895c80f6b6bcaf6fd"`);
        await queryRunner.query(`DROP TABLE "house_hold_member"`);
        await queryRunner.query(`DROP TYPE "public"."house_hold_member_roles_enum"`);
    }

}
