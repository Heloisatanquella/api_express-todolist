import { UserRepository } from "./repositories/user.repository";
import { JwtService } from "./services/jwt.service";
import { CreateUserUseCase } from "./usecases/user/create.usecase";
import { LoginUserUseCase } from "./usecases/user/login.usecase";
import { FindUserUseCase } from "./usecases/user/get.usecase";
import { UpdateUserUseCase } from "./usecases/user/update.usecase";
import { DeleteUserUseCase } from "./usecases/user/delete.usecase";
import { TaskRepository } from "./repositories/task.repository";
import { CreateTaskUseCase } from "./usecases/task/create.usecase";
import { GetTasksByIdUseCase } from "./usecases/task/getById.usecase";
import { GetTasksByUserUseCase } from "./usecases/task/getByUser.usecase";
import { DeleteTaskUseCase } from "./usecases/task/delete.usecase";
import { UpdateTaskUseCase } from "./usecases/task/update.usecase";
import { DeleteAllTasksUseCase } from "./usecases/task/deleteAll.usecase";
import { DeleteAllUsersUseCase } from "./usecases/user/deleteAll.usecase";

class DependencyContainer {
  private static instance: DependencyContainer;

  public jwtService: JwtService;
  public userRepository: UserRepository;
  public taskRepository: TaskRepository;
  public createUserUseCase: CreateUserUseCase;
  public loginUserUseCase: LoginUserUseCase;
  public findUserUseCase: FindUserUseCase;
  public updateUserUseCase: UpdateUserUseCase;
  public deleteUserUseCase: DeleteUserUseCase;
  public createTaskUseCase: CreateTaskUseCase;
  public getTasksByIdUseCase: GetTasksByIdUseCase;
  public getTasksByUserUseCase: GetTasksByUserUseCase;
  public updateTaskUseCase: UpdateTaskUseCase;
  public deleteTaskUseCase: DeleteTaskUseCase;
  public deleteAllTasksUseCase: DeleteAllTasksUseCase;
  public deleteAllUsersUseCase: DeleteAllUsersUseCase;

  private constructor() {
    // Services
    this.jwtService = new JwtService();

    // Repositories
    this.userRepository = new UserRepository();
    this.taskRepository = new TaskRepository();

    // Usecases
    this.createUserUseCase = new CreateUserUseCase(this.userRepository);
    this.loginUserUseCase = new LoginUserUseCase(
      this.userRepository,
      this.jwtService
    );
    this.findUserUseCase = new FindUserUseCase(this.userRepository);
    this.updateUserUseCase = new UpdateUserUseCase(this.userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(this.userRepository);

    this.createTaskUseCase = new CreateTaskUseCase(this.taskRepository);
    this.getTasksByIdUseCase = new GetTasksByIdUseCase(this.taskRepository);
    this.getTasksByUserUseCase = new GetTasksByUserUseCase(this.taskRepository);
    this.updateTaskUseCase = new UpdateTaskUseCase(this.taskRepository);
    this.deleteTaskUseCase = new DeleteTaskUseCase(this.taskRepository);

    this.deleteAllTasksUseCase = new DeleteAllTasksUseCase(this.taskRepository);
    this.deleteAllUsersUseCase = new DeleteAllUsersUseCase(this.userRepository);
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }
}

export const container = DependencyContainer.getInstance();
