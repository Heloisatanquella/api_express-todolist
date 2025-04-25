import { Task } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";
import { NotFoundError } from "../../errors/AppError";

type UseCaseParam = {
  id: number;
  userId: number;
};

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id, userId }: UseCaseParam): Promise<Task> {
    if (!id) {
      throw new NotFoundError("Task not found");
    } else {
      return this.taskRepository.delete(id, userId);
    }
  }
}
