import { DataSource } from "typeorm";
import { env } from "../config/env";

const isCompiled = __filename.endsWith(".js");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  entities: isCompiled
    ? ["dist/modules/**/entity/*.entity.js"]
    : ["src/modules/**/entity/*.entity.ts"],
  migrations: isCompiled ? ["dist/infra/migrations/*.js"] : ["src/infra/migrations/*.ts"],
});
