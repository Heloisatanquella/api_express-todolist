import { Task, Prisma } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";
import { NotFoundError } from "../../errors/AppError";

type UseCaseParam = {
  body: Prisma.TaskUpdateInput;
  userId: number;
  taskId: number;
};

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ body, userId, taskId }: UseCaseParam): Promise<Task> {
    if (!taskId) {
      throw new NotFoundError("Task not found");
    } else {
      return await this.taskRepository.update(
        taskId,
        {
          ...body,
        },
        userId
      );
    }
  }
}
