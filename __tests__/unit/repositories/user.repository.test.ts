import { User } from "@prisma/client";
import { UserRepository } from "../../../src/api/repositories/user.repository";
import prisma from "../../../src/api/libs/prisma";

jest.mock("../../../src/api/libs/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

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

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.create(userData);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userData,
        select: { id: true, name: true, email: true },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("findByUniqueProp", () => {
    it("deve encontrar um usuário por email sem senha", async () => {
      const where = { email: "test@example.com" };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.findByUniqueProp(where);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where,
        select: { id: true, name: true, email: true },
      });
      expect(result).toEqual(mockUser);
    });

    it("deve encontrar um usuário por email com senha quando solicitado", async () => {
      const where = { email: "test@example.com" };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.findByUniqueProp(where, true);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
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

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await userRepository.update(id, data);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id },
        data,
        select: { id: true, name: true, email: true },
      });
      expect(result).toEqual(mockUser);
    });
  });
}); 