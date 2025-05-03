import { NotFoundError } from "../../errors/AppError";
import { IUseCase } from "../../interfaces/usecase.inteface";
import { UserRepository } from "../../repositories/user.repository";

type Param = {
  id: number;
};

export class DeleteUserUseCase implements IUseCase<Param, void> {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ id }: Param): Promise<void> {
    const user = await this.userRepository.findByUniqueProp({ id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    await this.userRepository.delete(id);
  }
} 