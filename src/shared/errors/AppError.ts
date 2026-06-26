export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly timestamp: string;

  constructor(message: string, statusCode = 400, code = "BAD_REQUEST") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.timestamp = new Date().toISOString();
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request"): AppError {
    return new AppError(message, 400, "BAD_REQUEST");
  }

  static validationError(message = "Validation error"): AppError {
    return new AppError(message, 400, "VALIDATION_ERROR");
  }

  static unauthorized(message = "Unauthorized"): AppError {
    return new AppError(message, 401, "UNAUTHORIZED");
  }

  static invalidToken(
    message = "Your access token is invalid or has expired. Please log in again.",
  ): AppError {
    return new AppError(message, 401, "INVALID_TOKEN");
  }

  static passwordToken(message = "Your token is invalid or has expired."): AppError {
    return new AppError(message, 400, "PASSWORD_INVALID_TOKEN");
  }
  static invalidCredentials(message = "Invalid credentials"): AppError {
    return new AppError(message, 401, "INVALID_CREDENTIALS");
  }

  static forbidden(message = "Access denied"): AppError {
    return new AppError(message, 403, "FORBIDDEN");
  }

  static insufficientRole(message = "Insufficient role to perform this action"): AppError {
    return new AppError(message, 403, "INSUFFICIENT_ROLE");
  }

  static notFound(message = "Resource not found"): AppError {
    return new AppError(message, 404, "NOT_FOUND");
  }

  static tooManyRequests(
    message = "Too many requests — please slow down and try again in a moment.",
  ): AppError {
    return new AppError(message, 429, "TOO_MANY_REQUESTS");
  }
  static internal(message = "Internal server error"): AppError {
    return new AppError(message, 500, "INTERNAL_SERVER_ERROR");
  }

  toJSON(): object {
    return {
      status: "error",
      code: this.code,
      message: this.message,
      timestamp: this.timestamp,
    };
  }
}
