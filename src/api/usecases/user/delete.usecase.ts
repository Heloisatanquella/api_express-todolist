import { AppError } from "../../errors/AppError";
import prisma from "../../libs/prisma";

interface IRequest {
  userId: number;
}

export class DeleteUserUseCase {
  async execute({ userId }: IRequest): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await prisma.user.delete({
      where: { id: userId },
    });
  }
} 