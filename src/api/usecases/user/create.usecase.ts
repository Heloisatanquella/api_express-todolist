import { hash } from "bcrypt";
import { BadRequestError } from "../../errors/AppError";
import { UserRepository } from "../../repositories/user.repository";
import {  User } from "@prisma/client";

type UseCaseParam = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(body: UseCaseParam): Promise<User> {
    if (!body) {
      throw new BadRequestError("All fields are required.");
    }
    const hashedPassword = await hash(body.password, 10)

    return await this.userRepository.create({
        ...body,
        password: hashedPassword
    });
  }
}
