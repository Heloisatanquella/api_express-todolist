import { NextFunction, Request, Response } from "express";
import { container } from "../dependencies";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const usecase = container.createUserUseCase;
      const user = await usecase.execute(req.body);
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const usecase = container.loginUserUseCase;
      const result = await usecase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as number;
      const usecase = container.findUserUseCase;
      const user = await usecase.execute({ id: userId });

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as number;
      const usecase = container.updateUserUseCase;
      const user = await usecase.execute({ userId, ...req.body });

      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as number;
      const usecase = container.deleteUserUseCase;
      await usecase.execute({ id: userId });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async deleteAll(req: Request, res: Response, next: NextFunction) {
    try {
      const usecase = container.deleteAllUsersUseCase;
      await usecase.execute();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
