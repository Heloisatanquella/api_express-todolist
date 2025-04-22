import { Prisma } from "@prisma/client";
import { Task } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";

type UseCaseParam = {
  body: Prisma.TaskCreateInput;
  userId: number ;
};

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ body, userId }: UseCaseParam): Promise<Task> {
    return await this.taskRepository.create({
      ...body,
      user: {
        connect: {
          id: userId
        }
      }
    });
  }
}
