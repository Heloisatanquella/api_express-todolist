import { NextFunction, Request, Response } from "express";
import { container } from "../dependencies";

export class TaskController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as number;
      const usecase = container.createTaskUseCase;
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

      const usecase = container.updateTaskUseCase;
      const task = await usecase.execute({
        taskId: Number(id),
        userId,
        ...req.body,
      });

      res.status(200).json({ message: "Task updated successfully!", task });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.userId as number;

      const usecase = container.deleteTaskUseCase;
      await usecase.execute({
        taskId: Number(id),
        userId,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.userId as number;

      const usecase = container.getTasksByIdUseCase;
      const task = await usecase.execute({
        taskId: Number(id),
        userId: Number(userId),
      });

      res.status(200).json({ task });
    } catch (error) {
      next(error);
    }
  }

  static async getByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as number;

      const usecase = container.getTasksByUserUseCase;
      const tasks = await usecase.execute({ userId });

      res.status(200).json({ tasks });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      const usecase = container.deleteAllTasksUseCase;
      await usecase.execute();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
