import { Task } from "@prisma/client";
import { GetTasksByUserUseCase } from "../../../../src/api/usecases/task/getByUser.usecase";
import { TaskRepository } from "../../../../src/api/repositories/task.repository";

describe('GetTasksByUserUseCase', () => {
  let getTasksByUserUseCase: GetTasksByUserUseCase;
  let taskRepositoryMock: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    taskRepositoryMock = {
      findAllByUserId: jest.fn(),
    } as unknown as jest.Mocked<TaskRepository>;

    getTasksByUserUseCase = new GetTasksByUserUseCase(taskRepositoryMock);
  });

  it('deve retornar todas as tarefas de um usuário', async () => {
    const userId = 1;
    
    const tasks: Task[] = [
      {
        id: 1,
        title: "Tarefa 1",
        description: "Descrição da tarefa 1",
        completed: false,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Tarefa 2",
        description: "Descrição da tarefa 2",
        completed: true,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    taskRepositoryMock.findAllByUserId.mockResolvedValue(tasks);

    const result = await getTasksByUserUseCase.execute({ userId });

    expect(taskRepositoryMock.findAllByUserId).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.findAllByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(tasks);
  });

  it('deve retornar array vazio quando não houver tarefas', async () => {
    const userId = 1;

    taskRepositoryMock.findAllByUserId.mockResolvedValue([]);

    const result = await getTasksByUserUseCase.execute({ userId });

    expect(taskRepositoryMock.findAllByUserId).toHaveBeenCalledTimes(1);
    expect(taskRepositoryMock.findAllByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual([]);
  });
}); 