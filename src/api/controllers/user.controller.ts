import { UserRepository } from "../repositories/user.repository";
import { CreateUserUseCase } from "../usecases/user/create.usecase";
import { NextFunction, Request, Response } from "express";
import { FindUserUseCase } from "../usecases/user/get.usecase";
import { UpdateUserUseCase } from "../usecases/user/update.usecase";
import { NotFoundError, BadRequestError } from "../errors/AppError";
import { LoginUserUseCase } from "../usecases/user/login.usecase";

const repository = new UserRepository();

export class UserController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
          const { body } = req;
    
          const usecase = new CreateUserUseCase(repository);
          const user = await usecase.execute(body);
          res.status(201).json({message: 'User created successfully',user});
        } catch (error) {
           next(error);
        }
      }

      static async login(req: Request, res: Response, next: NextFunction) {
        try {
          const { body } = req;
    
          const usecase = new LoginUserUseCase();
          const result = await usecase.execute(body);
          res.status(201).json(result);
        } catch (error) {
           next(error);
        }
      }

      static async getById(req: Request, res: Response, next: NextFunction) {
        try {
          const userId = req.userId;
    
          if (!userId || isNaN(userId)) {
            throw new BadRequestError("Valid user ID is required.");
          }
    
          const usecase = new FindUserUseCase(repository);
          const user = await usecase.execute({ id: userId });
    
          if (!user) {
            throw new NotFoundError("User not found");
          }
    
          res.status(201).json(user);
        } catch (error) {
          next(error);
       }
      }

      static async update(req: Request, res: Response, next: NextFunction) {
        try {
          const { body, params } = req;
          const { id } = params;
          const userId = Number(id);
      
          if (!id || isNaN(userId)) {
            throw new BadRequestError("Valid user ID is required.");
          }
      
          const usecase = new UpdateUserUseCase(repository);
          const user = await usecase.execute({
            id: userId,
            body: body,
          });
      
          if (!user) {
            throw new NotFoundError("User not found");
          }
      
          res.status(201).json(user);
        } catch (error) {
          next(error);
       }
      }
      
}