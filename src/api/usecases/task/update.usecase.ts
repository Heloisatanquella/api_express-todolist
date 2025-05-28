import { Task } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";
import { NotFoundError } from "../../errors/AppError";
import { UpdateTaskDto } from "../../dtos/task.dtos";
import { IUseCase } from "../../interfaces/usecase.inteface";

type Param = UpdateTaskDto & {
  userId: number;
  taskId: number;
};

type Return = Task;

export class UpdateTaskUseCase implements IUseCase<Param, Return> {
  private taskRepository: TaskRepository
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute({ userId, taskId, ...rest }: Param): Promise<Task> {
    const task = await this.taskRepository.findById(taskId, userId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    return await this.taskRepository.update(taskId, userId, {
      ...rest,
    });
  }
}
