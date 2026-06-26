# Conventions

## Naming

| Context | Convention | Example |
| ------- | ---------- | ------- |
| Module folders | camelCase | `recurringTransaction/` |
| Entity files | `<name>.entity.ts` | `account.entity.ts` |
| Enum files | `<name>.enum.ts` | `account.enum.ts` |
| TypeScript properties | camelCase | `passwordHash`, `closingDay` |
| Database columns | snake_case via `name:` decorator | `name: 'password_hash'` |
| Database tables | snake_case | `credit_card_invoice` |
| Enum values | lowercase | `'credit_card'`, `'monthly'` |
| Migrations | `<timestamp>-<PascalCaseName>.ts` | `1782900000003-CreateAccountTable.ts` |
| Commit messages | Conventional Commits with scope | `feat(account): ...` |

## Entities

Every entity must follow this structure:

```ts
@Entity({ name: 'table_name' })
export class EntityName {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // FK column exposed as a typed property
  @Column({ type: 'uuid', nullable: false, name: 'related_id' })
  relatedId!: string;

  // Relation using the same column name
  @ManyToOne(() => Related, (r) => r.children, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'related_id' })
  related!: Related;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
```

Key rules:
- Always expose the raw FK as a `@Column` property alongside the `@ManyToOne` relation — this avoids loading the full relation just to get the ID
- All `decimal` columns must declare `precision` and `scale` explicitly: `{ type: 'decimal', precision: 14, scale: 2 }` — never use `float` or `double`
- Monetary columns use `decimal(14,2)`; high-precision columns (crypto/fractional shares) use `decimal(14,6)`
- `nullable: false` is explicit on every non-null FK column

## Enums

Enums live in the module that semantically owns them:

```ts
// src/modules/transaction/enum/transaction.enum.ts
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
}
```

Other modules import directly from the owning module:

```ts
import { TransactionType } from '../../transaction/enum/transaction.enum';
```

Never duplicate an enum across modules.

## Routes

Routes are registered centrally in `src/modules/routes/index.ts`:

```ts
const modules = [
  { path: '/health', router: healthRoutes },
  { path: '/accounts', router: accountRoutes },
] as const;
```

All routes are mounted under `/api/v1` in `src/index.ts`.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org) with a module scope:

```
feat(account): add balance recalculation on transaction insert
fix(auth): handle expired JWT without crashing
refactor(category): simplify self-referencing query builder
```

Common prefixes: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`.
