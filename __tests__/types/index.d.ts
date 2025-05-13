import { User, Task } from "@prisma/client";

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledWith(...args: unknown[]): R;
      toHaveBeenCalledTimes(expected: number): R;
      toEqual(expected: unknown): R;
      toBe(expected: unknown): R;
    }
  }
}

declare module "@prisma/client" {
  interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }
}

export {};

declare global {
  namespace Express {
    interface Request {
      user: User;
      task: Task;
      body: Record<string, unknown>;
      params: Record<string, unknown>;
      query: Record<string, unknown>;
    }
  }
} 