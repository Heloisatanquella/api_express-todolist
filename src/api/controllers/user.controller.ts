import { CreateUserUseCase } from "../usecases/user/create.usecase";
import { NextFunction, Request, Response } from "express";
import { FindUserUseCase } from "../usecases/user/get.usecase";
import { UpdateUserUseCase } from "../usecases/user/update.usecase";
import { LoginUserUseCase } from "../usecases/user/login.usecase";

export class UserController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {    
          const usecase = new CreateUserUseCase();
          const user = await usecase.execute(req.body);
          res.status(201).json({message: 'User created successfully',user});
        } catch (error) {
           next(error);
        }
      }

      static async login(req: Request, res: Response, next: NextFunction) {
        try {    
          const usecase = new LoginUserUseCase();
          const result = await usecase.execute(req.body);
          res.status(201).json(result);
        } catch (error) {
           next(error);
        }
      }

      static async getById(req: Request, res: Response, next: NextFunction) {
        try {
          const userId = req.userId as number;
          const usecase = new FindUserUseCase();
          const user = await usecase.execute({ id: userId });
    
          res.status(201).json(user);
        } catch (error) {
          next(error);
       }
      }

      static async update(req: Request, res: Response, next: NextFunction) {
        try {
          const userId = req.userId as number;
          const usecase = new UpdateUserUseCase();
          const user = await usecase.execute({ userId, ...req.body });
      
          res.status(201).json(user);
        } catch (error) {
          next(error);
       }
      }
      
}