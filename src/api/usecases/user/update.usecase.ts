import { NotFoundError } from "../../errors/AppError";
import { UserRepository } from "../../repositories/user.repository";
import { User } from "@prisma/client";

type UseCaseParam = {
  body: {
    name: string;
    email: string;
  };
  id: number;
};

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, body }: UseCaseParam): Promise<User> {
    if (!id) {
      throw new NotFoundError("User not found");
    } else {
      return await this.userRepository.update(id, body);
    }
  }
}
