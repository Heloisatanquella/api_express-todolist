import { Task } from '@prisma/client';
import { TaskRepository } from "../../repositories/task.repository";

export class GetTasksByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: number): Promise<Task | null> {
    return await this.taskRepository.findById(id);
  }
}
