# Migrations

Migrations are managed by TypeORM and live in `src/infra/migrations/`. Files are named `<timestamp>-<PascalCaseName>.ts` and run in timestamp order.

## Commands

| Command                                    | What it does                                      |
| ------------------------------------------ | ------------------------------------------------- |
| `pnpm migration:run`                       | Applies all pending migrations                    |
| `pnpm migration:revert`                    | Reverts the last applied migration                |
| `pnpm migration:show`                      | Lists all migrations and their applied status     |
| `pnpm migration:generate <MigrationName>`  | Generates a migration by diffing entities vs. DB  |

## Generating a migration

```bash
pnpm migration:generate CreateUserSettingsTable
```

This runs the TypeORM CLI against the live database and generates a file in `src/infra/migrations/` with the SQL diff. **Always review the generated file before committing** — the diff may include unintended changes if the database is out of sync.

The custom script (`scripts/generate-migration.ts`) handles the correct path and datasource arguments automatically.

## Writing a migration manually

Use this template:

```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class ExampleMigration1700000000000 implements MigrationInterface {
  name = "ExampleMigration1700000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`...`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`...`);
  }
}
```

Rules to follow:
- Drop FKs before dropping tables in `up`; restore them in the reverse order in `down`
- Drop enum types after the table that uses them
- Use `numeric(precision, scale)` for all monetary columns — never `float` or `double`
- Name constraints and indexes explicitly (e.g. `FK_account_user_id`, `UQ_budget_user_category_month`) to make `down` migrations reliable

## Migration history in this project

| File | Description |
| ---- | ----------- |
| `1782417763493-CreateUsersTable` | Initial users table |
| `1782418845880-CreateHouseHoldTable` | Initial household table (legacy name) |
| `1782419088065-CreateHouseHoldMemberTableAndAddRelationship` | Initial member table (legacy structure) |
| `1782900000001-AlterUsersTable` | Rename `passwordHash` → `password_hash`, drop `phone` |
| `1782900000002-DropAndRecreateHouseholdTables` | Replace legacy household tables with correct structure |
| `1782900000003-CreateAccountTable` | `account` table |
| `1782900000004-CreateAccountShareTable` | `account_share` join table |
| `1782900000005-CreateCreditCardInvoiceTable` | `credit_card_invoice` table |
| `1782900000006-CreateCategoryTable` | `category` table with self-referencing FK |
| `1782900000007-CreateRecurringTransactionTable` | `recurring_transaction` table |
| `1782900000008-CreateTransactionTable` | `transaction` table with composite index |
| `1782900000009-CreateInstallmentTable` | `installment` table |
| `1782900000010-CreateBudgetTable` | `budget` table |
| `1782900000011-CreateGoalTable` | `goal` table |
| `1782900000012-CreateInvestmentTable` | `investment` table |
| `1782900000013-CreateInvestmentTransactionTable` | `investment_transaction` table |
