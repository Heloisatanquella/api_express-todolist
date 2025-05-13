import { User } from '@prisma/client';
import { prismaMock } from '../../setup';

jest.mock("../../../src/api/libs/prisma", () => ({
  __esModule: true,
  default: prismaMock,
}));

import { UserRepository } from '../../../src/api/repositories/user.repository';

describe("UserRepository", () => {
  let userRepository: UserRepository;
  let mockUser: User;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = new UserRepository();
    mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe("create", () => {
    it("deve criar um usuário com sucesso", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "hashedpassword",
      };

      (prismaMock.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.create(userData);

      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: userData,
        select: { id: true, name: true, email: true },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("findByUniqueProp", () => {
    it("deve encontrar um usuário por email sem senha", async () => {
      const where = { email: "test@example.com" };

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.findByUniqueProp(where);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where,
        select: { id: true, name: true, email: true },
      });
      expect(result).toEqual(mockUser);
    });

    it("deve encontrar um usuário por email com senha quando solicitado", async () => {
      const where = { email: "test@example.com" };

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.findByUniqueProp(where, true);

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("update", () => {
    it("deve atualizar um usuário com sucesso", async () => {
      const id = 1;
      const data = {
        name: "Updated User",
        email: "updated@example.com",
      };

      (prismaMock.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.update(id, data);

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id },
        data,
        select: { id: true, name: true, email: true },
      });
      expect(result).toEqual(mockUser);
    });
  });
}); 