import { Task } from '@prisma/client';
import { TaskRepository } from "../../repositories/task.repository";

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: number): Promise<Task> {
    return this.taskRepository.delete(id);
  }
}
