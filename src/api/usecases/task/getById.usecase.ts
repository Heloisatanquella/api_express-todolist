import { Task } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";
import { NotFoundError } from "../../errors/AppError";

type UseCaseParam = {
  id: number;
  userId: number;
};

export class GetTasksByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id, userId }: UseCaseParam): Promise<Task | null> {
    if (!id) {
      throw new NotFoundError("Task not found");
    } else {
      return await this.taskRepository.findById(id, userId);
    }
  }
}
