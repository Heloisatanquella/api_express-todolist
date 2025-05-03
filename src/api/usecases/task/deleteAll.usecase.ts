import { TaskRepository } from "../../repositories/task.repository";

export class DeleteAllTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(): Promise<void> {
    await this.taskRepository.deleteAll();
  }
} 