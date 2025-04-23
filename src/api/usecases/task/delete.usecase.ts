import { Task } from "@prisma/client";
import { TaskRepository } from "../../repositories/task.repository";

type UseCaseParam = {
  id: number;
  userId: number
};

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id, userId }: UseCaseParam): Promise<Task> {
    return this.taskRepository.delete(id, userId);
  }
}
