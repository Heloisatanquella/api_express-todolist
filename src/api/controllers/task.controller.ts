import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskUseCase } from "../usecases/task/CreateTaskUseCase";
import { Request, Response } from "express";
import { UpdateTaskUseCase } from "../usecases/task/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "../usecases/task/DeleteTaskUseCase";
import { GetTasksByUserUseCase } from "../usecases/task/GetTasksByUserUseCase";
import { GetTasksByIdUseCase } from "../usecases/task/GetTasksByIdUseCase";

const repository = new TaskRepository();

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
        const usecase = new CreateTaskUseCase(repository);
        const { body, userId } = req;
        const task = await usecase.execute({ body, userId });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json(error);
    }
  }

  static async update(req: Request, res: Response) {
    const usecase = new UpdateTaskUseCase(repository);
    const task = await usecase.execute(Number(req.params.id), req.body);
    res.json(task);
  }

  static async delete(req: Request, res: Response) {
    const usecase = new DeleteTaskUseCase(repository);
    const task = await usecase.execute(Number(req.params.id));
    res.json({ message: 'Tarefa deletada com sucesso!', task });
  }

  static async getById(req: Request, res: Response) {
    const usecase = new GetTasksByIdUseCase(repository);
    const task = await usecase.execute(Number(req.params.id));
    if (!task) res.status(404).json({ message: "Tarefa não encontrada" });
    res.json(task);
  }

  static async getByUser(req: Request, res: Response) {
    const usecase = new GetTasksByUserUseCase(repository);
    const tasks = await usecase.execute(Number(req.userId));
    res.json(tasks);
  }
}
