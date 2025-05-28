import { NextFunction, Request, Response } from "express";
import { isKnownError } from "../errors/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (isKnownError(err)) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
