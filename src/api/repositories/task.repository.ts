import { Prisma, PrismaClient } from "@prisma/client";
import { Task } from "@prisma/client";
import prisma from "../libs/prisma";

export class TaskRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma
    }

    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        return await this.prisma.task.create({data})
    }

    async update(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
        return this.prisma.task.update({
          where: { id },
          data,
        });
      }

    async delete(id: number, userId: number): Promise<Task> {
        return await this.prisma.task.delete({where: {id, userId}})
    }

    async findById(id: number, userId: number): Promise<Task | null> {
        return await this.prisma.task.findUnique({where: {id, userId}})
    }

    async findAllByUserId(userId: number): Promise<Task[]> {
        return this.prisma.task.findMany({ where: { userId } });
      }
}