import { User } from "@prisma/client";
import { LoginUserUseCase } from "../../../../src/api/usecases/user/login.usecase";
import { UserRepository } from "../../../../src/api/repositories/user.repository";
import { JwtService } from "../../../../src/api/services/jwt.service";
import { UnauthorizedError } from "../../../../src/api/errors/AppError";
import { compare } from "bcrypt";

jest.mock("bcrypt");

describe('LoginUserUseCase', () => {
  let loginUserUseCase: LoginUserUseCase;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(() => {
    jest.clearAllMocks();

    userRepositoryMock = {
      findByUniqueProp: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    jwtServiceMock = {
      signin: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    loginUserUseCase = new LoginUserUseCase(userRepositoryMock, jwtServiceMock);
  });

  it('deve retornar um token quando as credenciais estiverem corretas', async () => {
    const email = "john@example.com";
    const password = "correctpassword";
    const hashedPassword = "hashedpassword";
    const userId = 1;
    const token = "generatedtoken";
    
    const existingUser: User = {
      id: userId,
      name: "John Doe",
      email: email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    userRepositoryMock.findByUniqueProp.mockResolvedValue(existingUser);
    (compare as jest.Mock).mockResolvedValue(true);
    jwtServiceMock.signin.mockReturnValue(token);

    const result = await loginUserUseCase.execute({ email, password });

    expect(userRepositoryMock.findByUniqueProp).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findByUniqueProp).toHaveBeenCalledWith({ email }, true);
    expect(compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(jwtServiceMock.signin).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.signin).toHaveBeenCalledWith({ userId });
    expect(result).toEqual({ token });
  });

  it('deve lançar erro quando o email não for encontrado', async () => {
    const email = "nonexistent@example.com";
    const password = "anypassword";

    userRepositoryMock.findByUniqueProp.mockResolvedValue(null);

    await expect(loginUserUseCase.execute({ email, password }))
      .rejects
      .toThrow(new UnauthorizedError("E-mail or password wrong"));

    expect(userRepositoryMock.findByUniqueProp).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.signin).not.toHaveBeenCalled();
  });

  it('deve lançar erro quando a senha estiver incorreta', async () => {
    const email = "john@example.com";
    const password = "wrongpassword";
    const hashedPassword = "hashedpassword";
    const userId = 1;
    
    const existingUser: User = {
      id: userId,
      name: "John Doe",
      email: email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    userRepositoryMock.findByUniqueProp.mockResolvedValue(existingUser);
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(loginUserUseCase.execute({ email, password }))
      .rejects
      .toThrow(new UnauthorizedError("E-mail or password wrong"));

    expect(userRepositoryMock.findByUniqueProp).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.signin).not.toHaveBeenCalled();
  });
}); 