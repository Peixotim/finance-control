# Architecture

## Overview

Finance Control is a personal finance REST API built with:

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **ORM:** TypeORM 1.x with PostgreSQL 17
- **Validation:** Zod (environment variables and request bodies)
- **Package manager:** pnpm

## Core design principle

`User` is the isolated, central entity. Every financial entity (`Account`, `Category`, `Budget`, `Goal`, `RecurringTransaction`, `Investment`) belongs **directly** to a `User` via a non-nullable `userId` FK. This means the entire MVP works without ever creating a `Household`.

`Household` is an **optional, additive** aggregation layer. Sharing an account with a household does not change its owner — it only creates an extra row in the `account_share` join table. Edit permission on a shared account is derived at query time from the user's `HouseholdMember.role` (`owner` → write, `member` → read-only); it is never stored as a column.

## Module structure

Each domain module lives under `src/modules/<name>/` and follows this layout:

```
src/modules/<name>/
  entity/
    <name>.entity.ts    ← TypeORM entity class
  enum/
    <name>.enum.ts      ← domain enums (only when the module owns them)
```

Modules that need additional layers (routes, controllers, services) extend this structure by adding the corresponding subdirectory. No module borrows or re-exports another module's enum — it imports directly from the owning module.

The datasource discovers all entities via glob (`src/modules/**/entity/*.entity.ts`), so new modules are registered automatically without touching `src/infra/database.ts`.

## Entity map

```
User
├── Account (1:N)
│   ├── Transaction (1:N)
│   │   └── Installment (1:N)
│   ├── CreditCardInvoice (1:N)
│   │   └── Transaction (1:N, nullable)
│   ├── AccountShare (1:N) ──→ Household
│   ├── Goal (1:N, funding account, optional)
│   └── RecurringTransaction (1:N)
│       └── Transaction (1:N, nullable)
├── Category (1:N, self-referencing hierarchy)
│   ├── Transaction (1:N, nullable)
│   ├── Budget (1:N)
│   └── RecurringTransaction (1:N, nullable)
├── Budget (1:N)
├── Goal (1:N)
├── RecurringTransaction (1:N)
└── Investment (1:N)
    └── InvestmentTransaction (1:N)

User ↔ Household   (N:N decomposed via HouseholdMember)
Account ↔ Household (N:N decomposed via AccountShare)
```

All N:N relationships in the domain are decomposed into explicit join entities (`HouseholdMember`, `AccountShare`) rather than using TypeORM's `@ManyToMany`, because both carry — or will carry — attributes of their own.

## Request flow

```
HTTP request
  → Express router  (src/modules/routes/index.ts)
    → Module router (src/modules/<name>/routes/)
      → Controller  (src/modules/<name>/controller/)
        → Service   (src/modules/<name>/service/)
          → TypeORM repository
```

Controllers are thin — they parse the request and delegate to services. Services own all business logic and interact with the database through TypeORM `EntityManager` or repository APIs.
