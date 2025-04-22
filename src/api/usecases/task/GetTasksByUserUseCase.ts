import { Task } from '@prisma/client';
import { TaskRepository } from "../../repositories/task.repository";

export class GetTasksByUserUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: number): Promise<Task[]> {
    return await this.taskRepository.findAllByUserId(userId);
  }
}
