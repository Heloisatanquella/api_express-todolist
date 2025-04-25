import { Task } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";
import { NotFoundError } from "../../errors/AppError";
import { IUseCase } from "../../interfaces/usecase.inteface";

type Param = {
  taskId: number;
  userId: number;
};

type Return = Task;

export class GetTasksByIdUseCase implements IUseCase<Param, Return> {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }
  async execute({ taskId, userId }: Param): Promise<Return> {
    const task = await this.taskRepository.findById(taskId, userId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return task;
  }
}
