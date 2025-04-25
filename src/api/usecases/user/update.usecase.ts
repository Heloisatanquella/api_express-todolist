import { UpdateUserDto } from "../../dtos/user.dtos";
import { IUseCase } from "../../interfaces/usecase.inteface";
import { UserRepository } from "../../repositories/user.repository";
import { User } from "@prisma/client";

type Param = UpdateUserDto & { userId: number };
type Return = User;

export class UpdateUserUseCase implements IUseCase<Param, Return> {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async execute({ userId, ...rest }: Param): Promise<User> {
      return await this.userRepository.update(userId, rest);
    
  }
}
