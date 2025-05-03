import { Task } from "@prisma/client";
import { GetTasksByIdUseCase } from "../../../../src/api/usecases/task/getById.usecase";
import { TaskRepository } from "../../../../src/api/repositories/task.repository";
import { NotFoundError } from "../../../../src/api/errors/AppError";

describe('GetTasksByIdUseCase', () => {
  let getTasksByIdUseCase: GetTasksByIdUseCase;
  let taskRepositoryMock: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    taskRepositoryMock = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    getTasksByIdUseCase = new GetTasksByIdUseCase(taskRepositoryMock);
  });

  it('deve retornar uma tarefa existente', async () => {
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

    const result = await getTasksByIdUseCase.execute({ taskId, userId });

    expect(taskRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.findById).toHaveBeenCalledWith(taskId, userId);
    expect(result).toEqual(existingTask);
  });

  it('deve lançar erro quando a tarefa não for encontrada', async () => {
    const taskId = 1;
    const userId = 1;

    taskRepositoryMock.findById.mockResolvedValue(null);

    await expect(getTasksByIdUseCase.execute({ taskId, userId }))
      .rejects
      .toThrow(new NotFoundError("Task not found"));

    expect(taskRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });
}); 