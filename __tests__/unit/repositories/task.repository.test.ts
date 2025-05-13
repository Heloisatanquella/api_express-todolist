import { Task } from '@prisma/client';
import { prismaMock } from '../../setup';

jest.mock("../../../src/api/libs/prisma", () => ({
  __esModule: true,
  default: prismaMock,
}));

import { TaskRepository } from '../../../src/api/repositories/task.repository';

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

      (prismaMock.task.create as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskRepository.create(taskData);

      expect(prismaMock.task.create).toHaveBeenCalledWith({
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

      (prismaMock.task.update as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskRepository.update(id, userId, data);

      expect(prismaMock.task.update).toHaveBeenCalledWith({
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

      (prismaMock.task.delete as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskRepository.delete(id, userId);

      expect(prismaMock.task.delete).toHaveBeenCalledWith({
        where: { id, userId },
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe("findById", () => {
    it("deve encontrar uma tarefa por id", async () => {
      const id = 1;
      const userId = 1;

      (prismaMock.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

      const result = await taskRepository.findById(id, userId);

      expect(prismaMock.task.findUnique).toHaveBeenCalledWith({
        where: { id, userId },
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe("findAllByUserId", () => {
    it("deve encontrar todas as tarefas de um usuário", async () => {
      const userId = 1;
      const mockTasks = [mockTask];

      (prismaMock.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

      const result = await taskRepository.findAllByUserId(userId);

      expect(prismaMock.task.findMany).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(result).toEqual(mockTasks);
    });
  });
}); 