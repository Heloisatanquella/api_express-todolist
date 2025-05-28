import { User } from "@prisma/client";
import { UpdateUserUseCase } from "../../../../src/api/usecases/user/update.usecase";
import { UserRepository } from "../../../../src/api/repositories/user.repository";
import { UpdateUserDto } from "../../../../src/api/dtos/user.dtos";

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    userRepositoryMock = {
      update: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    updateUserUseCase = new UpdateUserUseCase(userRepositoryMock);
  });

  it('deve atualizar um usuário existente', async () => {
    const userId = 1;
    const updateData: UpdateUserDto = {
      name: "John Updated",
      email: "john.updated@example.com"
    };
    
    const updatedUser: User = {
      id: userId,
      name: updateData.name,
      email: updateData.email,
      password: "hashedpassword",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    userRepositoryMock.update.mockResolvedValue(updatedUser);

    const result = await updateUserUseCase.execute({ 
      userId, 
      ...updateData 
    });

    expect(userRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.update).toHaveBeenCalledWith(userId, updateData);
    expect(result).toEqual(updatedUser);
  });
}); 