import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../../src/api/middlewares/verifyToken.middleware";
import { JwtService } from "../../../src/api/services/jwt.service";

jest.mock("../../../src/api/services/jwt.service");

describe('verifyToken', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it('deve retornar erro 401 quando não houver token', async () => {
    await verifyToken(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Token not provided' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve retornar erro 401 quando o token for inválido', async () => {
    mockRequest.headers = {
      authorization: 'Bearer invalid_token',
    };

    (JwtService.prototype.decode as jest.Mock).mockRejectedValue(new Error('Invalid token'));

    await verifyToken(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve chamar next quando o token for válido', async () => {
    mockRequest.headers = {
      authorization: 'Bearer valid_token',
    };

    (JwtService.prototype.decode as jest.Mock).mockResolvedValue({ userId: 1 });

    await verifyToken(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
}); 