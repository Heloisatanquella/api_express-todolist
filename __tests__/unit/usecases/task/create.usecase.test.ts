import { Task } from "@prisma/client";
import { CreateTaskUseCase } from "../../../../src/api/usecases/task/create.usecase";
import { TaskRepository } from "../../../../src/api/repositories/task.repository";
import { CreateTaskDto } from "../../../../src/api/dtos/task.dtos";

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepositoryMock: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    taskRepositoryMock = {
      create: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    createTaskUseCase = new CreateTaskUseCase(taskRepositoryMock);
  });

  it('deve criar uma nova tarefa', async () => {
    const userId = 1;
    const taskData: CreateTaskDto = {
      title: "Nova tarefa",
      description: "Descrição da tarefa"
    };
    
    const createdTask: Task = {
      id: 1,
      title: taskData.title,
      description: taskData.description,
      completed: false,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    taskRepositoryMock.create.mockResolvedValue(createdTask);

    const result = await createTaskUseCase.execute({ 
      userId, 
      ...taskData 
    });

    expect(taskRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.create).toHaveBeenCalledWith({
      ...taskData,
      user: {
        connect: {
          id: userId
        }
      }
    });
    expect(result).toEqual(createdTask);
  });
}); 