import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({ message: "title is required" })
  title!: string;

  @IsNotEmpty({ message: "description is required" })
  description!: string;
}

export class UpdateTaskDto {
  @IsNotEmpty({ message: "title is empty" })
  @IsOptional()
  title!: string;

  @IsNotEmpty({ message: "description is empty" })
  @IsOptional()
  description!: string;
}
