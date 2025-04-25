import { CreateTaskUseCase } from "../usecases/task/create.usecase";
import { NextFunction, Request, Response } from "express";
import { UpdateTaskUseCase } from "../usecases/task/update.usecase";
import { DeleteTaskUseCase } from "../usecases/task/delete.usecase";
import { GetTasksByUserUseCase } from "../usecases/task/getByUser.usecase";
import { GetTasksByIdUseCase } from "../usecases/task/getById.usecase";

export class TaskController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as number;
      const usecase = new CreateTaskUseCase();
      const task = await usecase.execute({ ...req.body, userId });
      res.status(201).json({ message: "Task created successfully!", task });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.userId as number;

      const usecase = new UpdateTaskUseCase();
      const task = await usecase.execute({
        taskId: Number(id),
        userId,
        ...req.body,
      });

      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.userId as number;

      const usecase = new DeleteTaskUseCase();
      await usecase.execute({
        taskId: Number(id),
        userId,
      });

      res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.userId as number;

      const usecase = new GetTasksByIdUseCase();
      const task = await usecase.execute({
        taskId: Number(id),
        userId: Number(userId),
      });

      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async getByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as number;

      const usecase = new GetTasksByUserUseCase();
      const tasks = await usecase.execute({ userId });

      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
}
