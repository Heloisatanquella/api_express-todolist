export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 400, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function isKnownError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export class BadRequestError extends AppError {
  constructor(message: string, statusCode = 400) {
    super(message, statusCode);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized access", statusCode = 401) {
    super(message, statusCode);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found", statusCode = 404) {
    super(message, statusCode);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict data", statusCode = 409) {
    super(message, statusCode);
  }
}

export class InternalError extends AppError {
  constructor(
    message: string = "An internal error occurred.",
    statusCode = 500
  ) {
    super(message, statusCode);
  }
}
