import express from "express";
import { env } from "./config/env";
import { AppDataSource } from "./infra/database";
import { routes } from "./modules/routes";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
const app = express();
const PORT = env.PORT ?? 8080;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  message: "Too many requests from this IP. Please try again later.",
  statusCode: 429,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use("/api/v1", routes);
app.set("trust proxy", true);

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
