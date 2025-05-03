import { UserRepository } from "../../repositories/user.repository";

export class DeleteAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<void> {
    await this.userRepository.deleteAll();
  }
} 