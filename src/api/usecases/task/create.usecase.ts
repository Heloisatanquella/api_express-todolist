import { Prisma } from "@prisma/client";
import { Task } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";
import { BadRequestError } from "../../errors/AppError";

type UseCaseParam = {
  body: Prisma.TaskCreateInput;
  userId: number ;
};

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ body, userId }: UseCaseParam): Promise<Task> {
    if (!body.title || !body.description) {
      throw new BadRequestError("Title and description is required.");
    }
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
