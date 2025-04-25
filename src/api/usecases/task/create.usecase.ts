import { Task } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";
import { IUseCase } from "../../interfaces/usecase.inteface";
import { CreateTaskDto } from "../../dtos/task.dtos";

type Param = CreateTaskDto & {
  userId: number
};
type Return = Task;

export class CreateTaskUseCase implements IUseCase<Param, Return> {
  private taskRepository: TaskRepository
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async execute({ userId, ...rest }: Param): Promise<Task> {
    return await this.taskRepository.create({
      ...rest,  
      user: {
        connect: {
          id: userId
        }
      }
    });
  }
}
