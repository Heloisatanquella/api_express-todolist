import { NotFoundError } from "../../errors/AppError";
import { UserRepository } from "../../repositories/user.repository";
import { User } from "@prisma/client";

type UseCaseParam = {
  id: number;
};

export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: UseCaseParam): Promise<User | null> {
    if (!id) {
      throw new NotFoundError("User not found");
    } else {
      return await this.userRepository.findByUniqueProp({ id });
    }
  }
}
