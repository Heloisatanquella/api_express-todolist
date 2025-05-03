import { Task } from '@prisma/client';
import { TaskRepository } from "../../repositories/task.repository";
import { IUseCase } from '../../interfaces/usecase.inteface';

type Param = {
  userId: number ;
};
type Return = Task[];

export class GetTasksByUserUseCase implements IUseCase<Param, Return> {
  private taskRepository: TaskRepository
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }
  
  async execute({ userId }: Param): Promise<Return> {
    return await this.taskRepository.findAllByUserId(userId);
  }
}
