import { hash } from "bcrypt";
import { UserRepository } from "../../repositories/user.repository";
import {  User } from "@prisma/client";
import { CreateUserDto } from "../../dtos/user.dtos";
import { IUseCase } from "../../interfaces/usecase.inteface";

type Param = CreateUserDto;
type Return = User

export class CreateUserUseCase implements IUseCase<Param, Return> {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(body: Param): Promise<User> {
    const hashedPassword = await hash(body.password, 10)

    return this.userRepository.create({
        ...body,
        password: hashedPassword
    });
  }
}
