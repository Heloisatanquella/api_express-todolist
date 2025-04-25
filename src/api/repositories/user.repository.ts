import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import prisma from "../libs/prisma";

export class UserRepository {
  private prisma: PrismaClient;
  private userWithOutPassword: Prisma.UserSelect;
  constructor() {
    this.prisma = prisma;
    this.userWithOutPassword = { id: true, name: true, email: true };
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
      select: this.userWithOutPassword,
    });
  }

  async findByUniqueProp(
    where: Prisma.UserWhereUniqueInput,
    showPassword = false
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where,
      ...(!showPassword && { select: this.userWithOutPassword }),
    });
  }

  async update(id: number, data: {name: string, email: string}): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
      select: this.userWithOutPassword, 
    });
  }
}
