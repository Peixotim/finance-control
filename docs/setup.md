# Setup

## Requirements

- [Node.js](https://nodejs.org) >= 20
- [pnpm](https://pnpm.io) >= 9
- [Docker](https://www.docker.com) (for the database)

## Installation

```bash
pnpm install
```

## Environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

| Variable      | Description                  | Default           |
| ------------- | ---------------------------- | ----------------- |
| `PORT`        | HTTP port the API listens on | `3000`            |
| `NODE_ENV`    | Runtime environment          | `development`     |
| `DB_HOST`     | PostgreSQL host              | `localhost`       |
| `DB_PORT`     | PostgreSQL port              | `5432`            |
| `DB_USER`     | PostgreSQL user              | —                 |
| `DB_PASSWORD` | PostgreSQL password          | —                 |
| `DB_NAME`     | PostgreSQL database name     | —                 |

All variables are validated at startup via [Zod](https://zod.dev). The app exits immediately if any required variable is missing or invalid.

## Starting the database

```bash
pnpm infra
```

This runs `docker compose up -d`, which starts a PostgreSQL 17 container named `finance-control-db` with a persistent volume. The container exposes the port defined in `DB_PORT`.

Wait for the container to be healthy before running migrations:

```bash
docker ps   # STATUS should show "(healthy)"
```

## Running migrations

Apply all pending migrations to the database:

```bash
pnpm migration:run
```

## Starting the dev server

```bash
pnpm dev
```

Uses `tsx watch` for hot-reload. The API is available at `http://localhost:<PORT>/api/v1`.

## Production build

```bash
pnpm build   # compiles TypeScript to dist/
pnpm start   # runs the compiled output
```
