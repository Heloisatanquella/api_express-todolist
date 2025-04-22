import { UserRepository } from "../../repositories/user.repository";
import { Prisma, User } from "@prisma/client";

type UseCaseParam = {
  body: Prisma.UserUpdateInput;
  id: number ;
};

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, body }: UseCaseParam): Promise<User> {
    return await this.userRepository.update(id, body)
  }
}
