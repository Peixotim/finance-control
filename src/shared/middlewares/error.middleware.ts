import { Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function errorMiddleware(err: unknown, req: Request, res: Response) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  res.status(500).json(AppError.badRequest().toJSON());
}
