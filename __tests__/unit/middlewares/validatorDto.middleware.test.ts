import { Request, Response, NextFunction } from "express";
import { validateDto } from "src/api/middlewares/validatorDto.middleware";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { IsNotEmpty } from 'class-validator';

jest.mock("class-transformer");
jest.mock("class-validator");

class TestDto {
  @IsNotEmpty()
  name!: string;
}

describe('validateDto', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockDtoClass: new () => TestDto;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as Partial<Response>;
    mockNext = jest.fn();
    mockDtoClass = TestDto;
  });

  it('deve chamar next() quando não houver erros de validação', async () => {
    const mockDtoInstance = new TestDto();
    const mockErrors: ValidationError[] = [];

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
    const mockDtoInstance = new TestDto();
    const mockErrors: ValidationError[] = [
      {
        property: 'name',
        constraints: {
          isNotEmpty: "Campo não pode estar vazio",
        },
      } as ValidationError
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

  it('should call next function when validation passes', async () => {
    const dto = new TestDto();
    dto.name = 'Test';
    mockRequest.body = dto;

    (plainToInstance as jest.Mock).mockReturnValue(dto);
    (validate as jest.Mock).mockResolvedValue([]);

    const middleware = validateDto(TestDto);
    await middleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 400 when validation fails', async () => {
    mockRequest.body = { name: '' };
    const mockDtoInstance = new TestDto();
    const mockErrors: ValidationError[] = [
      {
        property: 'name',
        constraints: {
          isNotEmpty: "Campo não pode estar vazio",
        },
      } as ValidationError
    ];
    (plainToInstance as jest.Mock).mockReturnValue(mockDtoInstance);
    (validate as jest.Mock).mockResolvedValue(mockErrors);

    const middleware = validateDto(TestDto);
    await middleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: ["Campo não pode estar vazio"],
    });
  });
}); 