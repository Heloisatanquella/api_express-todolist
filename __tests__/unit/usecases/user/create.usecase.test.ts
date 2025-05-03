import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { CreateUserUseCase } from "../../../../src/api/usecases/user/create.usecase";
import { UserRepository } from "../../../../src/api/repositories/user.repository";
import { CreateUserDto } from "../../../../src/api/dtos/user.dtos";

describe('CreateUserUseCase', () => {

  // Usecase a ser testado
  let createUserUseCase: CreateUserUseCase;
  // Parâmetro da instancia mocado
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Limpa todos os mocks antes de executar os testes
    jest.clearAllMocks();

    // Mock do repository do user que é necessário para a criação da instância do usecase
    userRepositoryMock = {
        create: jest.fn(),
      } as unknown as jest.Mocked<UserRepository>;

      // Faz a instancia do usecase
    createUserUseCase = new CreateUserUseCase(userRepositoryMock);
  });

  it('deve criar um usuário com a senha criptografada', async () => {
    // Mock do DTO para a execução do usecase
    const body: CreateUserDto = {
      name: "John Doe",
      email: "john@example.com",
      password: "plainpassword"
    };
    // Mock do hash
    const hashedPassword = await hash(body.password, 10);
    // Mock do retorno do metodo create do userRepository
    const createdUser: User = {
      id: 123,
      name: body.name,
      email: body.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    // Faz o mock do retorno do metodo create
    userRepositoryMock.create.mockResolvedValue(createdUser);

    // Executa o metodo que queremos testar
    const result = await createUserUseCase.execute(body);

    // Valida o teste
    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.create).toHaveBeenCalledWith({
      ...body,
      password: expect.any(String),
    });
    expect(result).toEqual(createdUser);
    expect(result.password).not.toBe(body.password);
  });
});
