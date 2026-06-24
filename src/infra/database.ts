import { DataSource } from "typeorm";
import { env } from "../config/env";

export const AppDataSource = new DataSource({
  type: "postgres",
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  port: Number(env.DB_PORT),
  database: env.DB_NAME,
  host: env.DB_HOST,
});
