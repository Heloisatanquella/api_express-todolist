import { Task } from '@prisma/client';
import { TaskRepository } from "../../repositories/task.repository";

type UseCaseParam = {
  id: number ;
};

export class GetTasksByUserUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id }: UseCaseParam): Promise<Task[]> {
    return await this.taskRepository.findAllByUserId(id);
  }
}
