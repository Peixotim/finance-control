import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedCanonicalTypes1790000000008 implements MigrationInterface {
  name = "SeedCanonicalTypes1790000000008";

  private readonly outlayTypes: ReadonlyArray<[string, string]> = [
    ["FOOD", "Alimentação"],
    ["TRANSPORT", "Transporte"],
    ["HOUSING", "Moradia"],
    ["HEALTH", "Saúde"],
    ["EDUCATION", "Educação"],
    ["LEISURE", "Lazer"],
    ["SUBSCRIPTION", "Assinaturas"],
    ["SHOPPING", "Compras"],
    ["OTHER", "Outros"],
  ];

  private readonly incomeTypes: ReadonlyArray<[string, string]> = [
    ["SALARY", "Salário"],
    ["FREELANCE", "Freelance"],
    ["INVESTMENT", "Investimento"],
    ["GIFT", "Presente / Doação"],
    ["REFUND", "Reembolso"],
    ["OTHER", "Outros"],
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const [code, label] of this.outlayTypes) {
      await queryRunner.query(
        `INSERT INTO "outlay_type" ("code", "label") VALUES ($1, $2) ON CONFLICT ("code") DO NOTHING`,
        [code, label],
      );
    }
    for (const [code, label] of this.incomeTypes) {
      await queryRunner.query(
        `INSERT INTO "income_type" ("code", "label") VALUES ($1, $2) ON CONFLICT ("code") DO NOTHING`,
        [code, label],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "outlay_type" WHERE "code" = ANY($1)`,
      [this.outlayTypes.map(([code]) => code)],
    );
    await queryRunner.query(
      `DELETE FROM "income_type" WHERE "code" = ANY($1)`,
      [this.incomeTypes.map(([code]) => code)],
    );
  }
}
