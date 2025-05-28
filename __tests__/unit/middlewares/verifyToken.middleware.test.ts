import { Request, Response, NextFunction } from "express";
import verifyToken from "src/api/middlewares/verifyToken.middleware";
import jwtService from "src/api/services/jwt.service";

jest.mock("src/api/services/jwt.service");

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
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('deve retornar erro 403 quando não houver token', async () => {
    await verifyToken(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.send).toHaveBeenCalledWith('Token não encontrado');
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve retornar erro 403 quando o token for inválido', async () => {
    mockRequest.headers = {
      authorization: 'Bearer invalidtoken',
    };

    (jwtService.decode as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await verifyToken(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith('Token inválido');
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve chamar next() quando o token for válido', async () => {
    const userId = 1;
    mockRequest.headers = {
      authorization: 'Bearer validtoken',
    };

    (jwtService.decode as jest.Mock).mockReturnValue({ userId });

    await verifyToken(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockRequest.userId).toBe(userId);
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.send).not.toHaveBeenCalled();
  });

  it('deve retornar erro 401 quando o token não tiver userId', async () => {
    mockRequest.headers = {
      authorization: 'Bearer invalidtoken',
    };

    (jwtService.decode as jest.Mock).mockReturnValue({});

    await verifyToken(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith('Token inválido');
    expect(mockNext).not.toHaveBeenCalled();
  });
}); 