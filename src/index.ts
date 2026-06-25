import express from "express";
import { env } from "./config/env";
import { AppDataSource } from "./infra/database";
import {routes} from "./modules/routes";

const app = express();
const PORT = env.PORT ?? 8080;

app.use(express.json())
app.use('/api/v1',routes)

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`API is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
