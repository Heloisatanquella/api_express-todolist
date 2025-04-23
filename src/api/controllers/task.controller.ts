import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskUseCase } from "../usecases/task/create.usecase";
import { NextFunction, Request, Response } from "express";
import { UpdateTaskUseCase } from "../usecases/task/update.usecase";
import { DeleteTaskUseCase } from "../usecases/task/delete.usecase";
import { GetTasksByUserUseCase } from "../usecases/task/getByUser.usecase";
import { GetTasksByIdUseCase } from "../usecases/task/getById.usecase";
import { NotFoundError, BadRequestError } from "../errors/AppError";

const repository = new TaskRepository();

export class TaskController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, userId } = req;

      if (!userId) {
        throw new BadRequestError("Task ID is required");
      } else {
        const usecase = new CreateTaskUseCase(repository);
        const task = await usecase.execute({ body, userId });
        res.status(201).json({ message: "Task created successfully!", task });
      }
    } catch (error) {
      next(error);
   }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("Task ID is required");
      }

      const { userId } = req;
      const usecase = new UpdateTaskUseCase(repository);

      const task = await usecase.execute({
        taskId: Number(id),
        body: req.body,
        userId: Number(userId),
      });

      if (!task) {
        throw new NotFoundError("Task not found");
      }

      res.json(task);
    } catch (error) {
      next(error);
   }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("Task ID is required");
      }

      const { userId } = req.params;
      const usecase = new DeleteTaskUseCase(repository);

      const task = await usecase.execute({
        id: Number(id),
        userId: Number(userId),
      });

      if (!task) {
        throw new NotFoundError("Task not found");
      }
      res.json({ message: "Task deleted successfully!", task });
    } catch (error) {
      next(error);
   }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("Task ID is required");
      }

      const { userId } = req;

      const usecase = new GetTasksByIdUseCase(repository);
      const task = await usecase.execute({
        id: Number(id),
        userId: Number(userId),
      });

      if (!task) {
        throw new NotFoundError("Task not found");
      }
      res.json(task);
    } catch (error) {
      next(error);
   }
  }

  static async getByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      if (!userId) {
        throw new BadRequestError("User ID is required");
      } else {
        const usecase = new GetTasksByUserUseCase(repository);
        const tasks = await usecase.execute({ id: userId });
        if (tasks.length === 0) {
          throw new NotFoundError("No tasks found for this user.");
        }
        res.json(tasks);
      }
    } catch (error) {
      next(error);
   }
  }
}
