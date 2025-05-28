/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledWith(...args: any[]): R;
      toHaveBeenCalledTimes(expected: number): R;
      toEqual(expected: any): R;
      toBe(expected: any): R;
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
