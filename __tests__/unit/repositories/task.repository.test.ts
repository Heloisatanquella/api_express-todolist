import { PrismaClient, Task } from "@prisma/client";
import { TaskRepository } from "../../../src/api/repositories/task.repository";
import prisma from "../../../src/api/libs/prisma";

jest.mock("../../../src/api/libs/prisma", () => ({
  __esModule: true,
  default: {
    task: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe("TaskRepository", () => {
  let taskRepository: TaskRepository;
  let mockTask: Task;

  beforeEach(() => {
    jest.clearAllMocks();
    taskRepository = new TaskRepository();
    mockTask = {
      id: 1,
      title: "Test Task",
      description: "Test Description",
      completed: false,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe("create", () => {
    it("deve criar uma tarefa com sucesso", async () => {
      const taskData = {
        title: "Test Task",
        description: "Test Description",
        user: {
          connect: {
            id: 1
          }
        }
      };

      (prisma.task.create as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskRepository.create(taskData);

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: taskData,
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe("update", () => {
    it("deve atualizar uma tarefa com sucesso", async () => {
      const id = 1;
      const userId = 1;
      const data = {
        title: "Updated Task",
        description: "Updated Description",
        completed: true,
      };

      (prisma.task.update as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskRepository.update(id, userId, data);

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id, userId },
        data,
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe("delete", () => {
    it("deve deletar uma tarefa com sucesso", async () => {
      const id = 1;
      const userId = 1;

      (prisma.task.delete as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskRepository.delete(id, userId);

      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id, userId },
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe("findById", () => {
    it("deve encontrar uma tarefa por id", async () => {
      const id = 1;
      const userId = 1;

      (prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskRepository.findById(id, userId);

      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id, userId },
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe("findAllByUserId", () => {
    it("deve encontrar todas as tarefas de um usuário", async () => {
      const userId = 1;
      const mockTasks = [mockTask];

      (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

      const result = await taskRepository.findAllByUserId(userId);

      expect(prisma.task.findMany).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(result).toEqual(mockTasks);
    });
  });
}); 