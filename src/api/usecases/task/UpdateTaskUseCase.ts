import { Task, Prisma } from '@prisma/client';
import { TaskRepository } from "../../repositories/task.repository";

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
    return await this.taskRepository.update(id, data);
  }
}
