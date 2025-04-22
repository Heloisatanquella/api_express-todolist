import { Task } from '@prisma/client';
import { TaskRepository } from "../../repositories/task.repository";

type UseCaseParam = {
  id: number ;
  userId: number
};

export class GetTasksByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id, userId }: UseCaseParam): Promise<Task | null> {
    return await this.taskRepository.findById(id, userId);
  }
}
