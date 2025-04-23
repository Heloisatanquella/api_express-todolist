import { UserRepository } from "../../repositories/user.repository";
import { User } from "@prisma/client";

type UseCaseParam = {
  id: number ;
};

export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: UseCaseParam): Promise<User | null> {
    return await this.userRepository.findByUniqueProp({ id })
  }
}
