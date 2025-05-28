import { Task } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";
import { NotFoundError } from "../../errors/AppError";
import { IUseCase } from "../../interfaces/usecase.inteface";

type Param = {
  taskId: number;
  userId: number;
};
type Return = Task;

export class DeleteTaskUseCase implements IUseCase<Param, Return> {
  private taskRepository: TaskRepository
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute({ taskId, userId }: Param): Promise<Task> {
    const task = await this.taskRepository.findById(taskId, userId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    return this.taskRepository.delete(taskId, userId);
  }
}
