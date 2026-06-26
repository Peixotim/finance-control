import express from "express";
import { env } from "./config/env";
import { AppDataSource } from "./infra/database";
import { routes } from "./modules/routes";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { AppError } from "./shared/errors/AppError";
const app = express();
const PORT = env.PORT ?? 8080;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  handler: (req, res, next) => {
    next(AppError.tooManyRequests());
  },
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use("/api/v1", routes);

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
