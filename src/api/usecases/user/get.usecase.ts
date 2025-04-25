import { NotFoundError } from "../../errors/AppError";
import { IUseCase } from "../../interfaces/usecase.inteface";
import { UserRepository } from "../../repositories/user.repository";
import { User } from "@prisma/client";

type Param = {
  id: number;
};
type Return = User;

export class FindUserUseCase implements IUseCase<Param, Return> {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute({ id }: Param): Promise<Return> {
    const user = await this.userRepository.findByUniqueProp({ id });

    if (user) {
      return user;
    }

    throw new NotFoundError("User not found");
  }
}
