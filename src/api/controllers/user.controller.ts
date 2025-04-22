import { UserRepository } from "../repositories/user.repository";
import { CreateUserUseCase } from "../usecases/user/CreateUserUseCase";
import { Request, Response } from "express";
import { FindUserUseCase } from "../usecases/user/FindUserUseCase";
import { UpdateUserUseCase } from "../usecases/user/UpdateUserUseCase";

const repository = new UserRepository();

export class UserController {
    static async create(req: Request, res: Response) {
        try {
          const { body } = req.body;
    
          const usecase = new CreateUserUseCase(repository);
          const user = await usecase.execute({ body });
          res.status(201).json({message: 'User created successfully',user});
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            res.status(500).json({ message: "Failed to create user.", error: error.message });
          }
          res.status(500).json({ message: "Unknown error occurred." });
        }
      }


      static async getById(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const userId = Number(id);
    
          if (!id || isNaN(userId)) {
            res.status(400).json({ message: "Valid user ID is required." });
          }
    
          const usecase = new FindUserUseCase(repository);
          const user = await usecase.execute({ id: userId });
    
          if (!user) {
            res.status(404).json({ message: "User not found." });
          }
    
          res.status(201).json(user);
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            res.status(500).json({ message: "Failed to get user.", error: error.message });
          }
          res.status(500).json({ message: "Unknown error occurred." });
        }
      }

      static async update(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const { body } = req.body;
          const userId = Number(id);
      
          if (!id || isNaN(userId)) {
            res.status(400).json({ message: "Valid user ID is required." });
          }
      
          const usecase = new UpdateUserUseCase(repository);
          const user = await usecase.execute({
            id: userId,
            body: body,
          });
      
          if (!user) {
            res.status(404).json({ message: "User not found." });
          }
      
          res.status(201).json(user);
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            res.status(500).json({ message: "Failed to update user.", error: error.message });
          }
          res.status(500).json({ message: "Unknown error occurred." });
        }
      }
      
}