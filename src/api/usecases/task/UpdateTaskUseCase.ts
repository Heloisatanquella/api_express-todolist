import { Task, Prisma } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";

type UseCaseParam = {
  body: Prisma.TaskUpdateInput;
  userId: number;
  taskId: number;
};

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ body, userId, taskId }: UseCaseParam): Promise<Task> {
    return await this.taskRepository.update(taskId, {
      ...body,
      user: {
        connect: {
          id: userId,
        },
      },
    });
  }
}
