import { Request, Response, NextFunction } from "express";
import { errorHandler } from "src/api/middlewares/errorHandler.middleware";
import { NotFoundError, UnauthorizedError } from "src/api/errors/AppError";

describe('errorHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('deve tratar erro NotFoundError corretamente', () => {
    const error = new NotFoundError("Resource not found");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Resource not found",
    });
  });

  it('deve tratar erro UnauthorizedError corretamente', () => {
    const error = new UnauthorizedError("Unauthorized access");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Unauthorized access",
    });
  });

  it('deve tratar erro genérico corretamente', () => {
    const error = new Error("Internal server error");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Internal server error",
    });
  });
}); 