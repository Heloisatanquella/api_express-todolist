import { User } from "@prisma/client";
import { FindUserUseCase } from "../../../../src/api/usecases/user/get.usecase";
import { UserRepository } from "../../../../src/api/repositories/user.repository";
import { NotFoundError } from "../../../../src/api/errors/AppError";

describe('FindUserUseCase', () => {
  let findUserUseCase: FindUserUseCase;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    userRepositoryMock = {
      findByUniqueProp: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    findUserUseCase = new FindUserUseCase(userRepositoryMock);
  });

  it('deve retornar um usuário existente', async () => {
    const userId = 1;
    
    const existingUser: User = {
      id: userId,
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    userRepositoryMock.findByUniqueProp.mockResolvedValue(existingUser);

    const result = await findUserUseCase.execute({ id: userId });

    expect(userRepositoryMock.findByUniqueProp).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findByUniqueProp).toHaveBeenCalledWith({ id: userId });
    expect(result).toEqual(existingUser);
  });

  it('deve lançar erro quando o usuário não for encontrado', async () => {
    const userId = 1;

    userRepositoryMock.findByUniqueProp.mockResolvedValue(null);

    await expect(findUserUseCase.execute({ id: userId }))
      .rejects
      .toThrow(new NotFoundError("User not found"));

    expect(userRepositoryMock.findByUniqueProp).toHaveBeenCalledTimes(1);
  });
}); 