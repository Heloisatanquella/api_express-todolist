import { Task } from "@prisma/client";
import { DeleteTaskUseCase } from "../../../../src/api/usecases/task/delete.usecase";
import { TaskRepository } from "../../../../src/api/repositories/task.repository";
import { NotFoundError } from "../../../../src/api/errors/AppError";

describe('DeleteTaskUseCase', () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let taskRepositoryMock: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    taskRepositoryMock = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    deleteTaskUseCase = new DeleteTaskUseCase(taskRepositoryMock);
  });

  it('deve deletar uma tarefa existente', async () => {
    const taskId = 1;
    const userId = 1;
    
    const existingTask: Task = {
      id: taskId,
      title: "Tarefa existente",
      description: "Descrição da tarefa",
      completed: false,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    taskRepositoryMock.findById.mockResolvedValue(existingTask);
    taskRepositoryMock.delete.mockResolvedValue(existingTask);

    const result = await deleteTaskUseCase.execute({ taskId, userId });

    expect(taskRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.findById).toHaveBeenCalledWith(taskId, userId);
    expect(taskRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.delete).toHaveBeenCalledWith(taskId, userId);
    expect(result).toEqual(existingTask);
  });

  it('deve lançar erro quando a tarefa não for encontrada', async () => {
    const taskId = 1;
    const userId = 1;

    taskRepositoryMock.findById.mockResolvedValue(null);

    await expect(deleteTaskUseCase.execute({ taskId, userId }))
      .rejects
      .toThrow(new NotFoundError("Task not found"));

    expect(taskRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.delete).not.toHaveBeenCalled();
  });
}); 