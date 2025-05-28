import { IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({ message: "title is required" })
  title!: string;

  @IsNotEmpty({ message: "description is required" })
  description!: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class UpdateTaskDto {
  @IsNotEmpty({ message: "title is empty" })
  @IsOptional()
  title!: string;

  @IsNotEmpty({ message: "description is empty" })
  @IsOptional()
  description!: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
