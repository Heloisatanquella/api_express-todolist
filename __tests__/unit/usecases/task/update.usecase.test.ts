import { Task } from "@prisma/client";
import { UpdateTaskUseCase } from "../../../../src/api/usecases/task/update.usecase";
import { TaskRepository } from "../../../../src/api/repositories/task.repository";
import { NotFoundError } from "../../../../src/api/errors/AppError";
import { UpdateTaskDto } from "../../../../src/api/dtos/task.dtos";

describe('UpdateTaskUseCase', () => {
  let updateTaskUseCase: UpdateTaskUseCase;
  let taskRepositoryMock: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    taskRepositoryMock = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    updateTaskUseCase = new UpdateTaskUseCase(taskRepositoryMock);
  });

  it('deve atualizar uma tarefa existente', async () => {
    const taskId = 1;
    const userId = 1;
    const updateData: UpdateTaskDto = {
      title: "Tarefa atualizada",
      description: "Nova descrição",
      completed: true
    };
    
    const existingTask: Task = {
      id: taskId,
      title: "Tarefa original",
      description: "Descrição original",
      completed: false,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedTask: Task = {
      ...existingTask,
      ...updateData
    };

    taskRepositoryMock.findById.mockResolvedValue(existingTask);
    taskRepositoryMock.update.mockResolvedValue(updatedTask);

    const result = await updateTaskUseCase.execute({ 
      taskId, 
      userId, 
      ...updateData 
    });

    expect(taskRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.findById).toHaveBeenCalledWith(taskId, userId);
    expect(taskRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.update).toHaveBeenCalledWith(taskId, userId, updateData);
    expect(result).toEqual(updatedTask);
  });

  it('deve lançar erro quando a tarefa não for encontrada', async () => {
    const taskId = 1;
    const userId = 1;
    const updateData: UpdateTaskDto = {
      title: "Tarefa atualizada",
      description: "Nova descrição"
    };

    taskRepositoryMock.findById.mockResolvedValue(null);

    await expect(updateTaskUseCase.execute({ 
      taskId, 
      userId, 
      ...updateData 
    }))
      .rejects
      .toThrow(new NotFoundError("Task not found"));

    expect(taskRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.update).not.toHaveBeenCalled();
  });
}); 