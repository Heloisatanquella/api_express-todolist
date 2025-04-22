import { UserRepository } from "../../repositories/user.repository";
import { Prisma, User } from "@prisma/client";

type UseCaseParam = {
  body: Prisma.UserCreateInput;
};

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ body }: UseCaseParam): Promise<User> {
    return await this.userRepository.create({
        ...body,
    });
  }
}
