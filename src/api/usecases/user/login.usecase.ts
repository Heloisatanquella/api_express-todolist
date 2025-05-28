import { compare } from "bcrypt";
import { UnauthorizedError } from "../../errors/AppError";
import { IUseCase } from "../../interfaces/usecase.inteface";
import { UserRepository } from "../../repositories/user.repository";
import { JwtService } from "../../services/jwt.service";

type Param = {
  email: string;
  password: string;
};

type Return = {
  token: string;
};

export class LoginUserUseCase implements IUseCase<Param, Return> {
  private userRepository: UserRepository;
  private jwtService: JwtService;

  constructor(userRepository: UserRepository, jwtService: JwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async execute({ email, password }: Param): Promise<Return> {
    const user = await this.userRepository.findByUniqueProp({ email }, true);
    if (!user) {
      throw new UnauthorizedError("E-mail or password wrong");
    }

    const encryptedPassword = user.password;
    const validPassword = await compare(password, encryptedPassword);

    if (!validPassword) {
      throw new UnauthorizedError("E-mail or password wrong");
    }

    const token = this.jwtService.signin({ userId: user.id });

    return { token };
  }
}
