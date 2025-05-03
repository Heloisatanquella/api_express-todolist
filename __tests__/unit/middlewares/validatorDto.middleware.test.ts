import { Request, Response, NextFunction } from "express";
import { validateDto } from "src/api/middlewares/validatorDto.middleware";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

jest.mock("class-transformer");
jest.mock("class-validator");

describe('validateDto', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockDtoClass: any;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockDtoClass = jest.fn();
  });

  it('deve chamar next() quando não houver erros de validação', async () => {
    const mockDtoInstance = {};
    const mockErrors: any[] = [];

    (plainToInstance as jest.Mock).mockReturnValue(mockDtoInstance);
    (validate as jest.Mock).mockResolvedValue(mockErrors);

    const middleware = validateDto(mockDtoClass);
    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(plainToInstance).toHaveBeenCalledWith(mockDtoClass, mockRequest.body);
    expect(validate).toHaveBeenCalledWith(mockDtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it('deve retornar erro 400 quando houver erros de validação', async () => {
    const mockDtoInstance = {};
    const mockErrors = [
      {
        constraints: {
          isNotEmpty: "Campo não pode estar vazio",
        },
      },
    ];

    (plainToInstance as jest.Mock).mockReturnValue(mockDtoInstance);
    (validate as jest.Mock).mockResolvedValue(mockErrors);

    const middleware = validateDto(mockDtoClass);
    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(plainToInstance).toHaveBeenCalledWith(mockDtoClass, mockRequest.body);
    expect(validate).toHaveBeenCalledWith(mockDtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: ["Campo não pode estar vazio"],
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
}); 