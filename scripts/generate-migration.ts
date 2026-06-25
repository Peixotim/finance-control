import { execSync } from "child_process";
import path from "path";

const name = process.argv[2];

if (!name) {
  console.error("Error: migration name is required");
  console.error("Usage: npm run migration:generate <MigrationName>");
  console.error("Example: npm run migration:generate CreateUsersTable");
  process.exit(1);
}

const migrationsDir = path.join("src", "infra", "migrations", name);
const datasource = path.join("src", "infra", "database.ts");

execSync(`tsx ./node_modules/typeorm/cli.js migration:generate -d ${datasource} ${migrationsDir}`, {
  stdio: "inherit",
});
