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
      const { body, userId } = req;

      if (!userId) {
        res.status(400).json({ message: "User ID is required." });
      } else {
        const usecase = new CreateTaskUseCase(repository);
        const task = await usecase.execute({ body, userId });
        res.status(201).json({ message: "Task created successfully!", task });
      }

    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to create task.", error: error.message });
      }
      res.status(500).json({ message: "Unknown error occurred." });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Task ID is required." });
      }

      const { userId } = req;
      const usecase = new UpdateTaskUseCase(repository);

      const task = await usecase.execute({
        taskId: Number(id),
        body: req.body,
        userId: Number(userId),
      });

      if (!task) {
        res.status(404).json({ message: "Task not found." });
      }

      res.json(task);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to update task.", error: error.message });
      }
      res.status(500).json({ message: "Unknown error occurred." });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Task ID is required." });
      }

      const { userId } = req.params;
      const usecase = new DeleteTaskUseCase(repository);

      const task = await usecase.execute({
        id: Number(id),
        userId: Number(userId),
      });

      if (!task) {
        res.status(404).json({ message: "Task not found." });
      }
      res.json({ message: "Task deleted successfully!", task });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to delete task.", error: error.message });
      }
      res.status(500).json({ message: "Unknown error occurred." });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Task ID is required." });
      }

      const { userId } = req;

      const usecase = new GetTasksByIdUseCase(repository);
      const task = await usecase.execute({
        id: Number(id),
        userId: Number(userId),
      });

      if (!task) {
        res.status(404).json({ message: "Task not found." });
      }
      res.json(task);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed to retrieve task.", error: error.message });
      }
      res.status(500).json({ message: "Unknown error occurred." });
    }
  }

  static async getByUser(req: Request, res: Response) {
    try {
      const { userId } = req;
      if (!userId) {
        res.status(400).json({ message: "User ID is required." });
      } else {
        const usecase = new GetTasksByUserUseCase(repository);
        const tasks = await usecase.execute({ id: userId });
        if (tasks.length === 0) {
          res.status(404).json({ message: "No tasks found for this user." });
        }
        res.json(tasks);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Failed to retrieve tasks.", error: error.message });
      }
      res.status(500).json({ message: "Unknown error occurred." });
    }
  }
}
