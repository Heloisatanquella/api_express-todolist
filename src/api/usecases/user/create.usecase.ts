import { hash } from "bcrypt";
import { UserRepository } from "../../repositories/user.repository";
import {  User } from "@prisma/client";
import { CreateUserDto } from "../../dtos/user.dtos";
import { IUseCase } from "../../interfaces/usecase.inteface";

type Param = CreateUserDto;
type Return = User

export class CreateUserUseCase implements IUseCase<Param, Return> {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(body: Param): Promise<User> {
    const hashedPassword = await hash(body.password, 10)

    return await this.userRepository.create({
        ...body,
        password: hashedPassword
    });
  }
}
