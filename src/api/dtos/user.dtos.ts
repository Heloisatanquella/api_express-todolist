import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Invalid e-mail' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid e-mail' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Name is empty' })
  @IsOptional()
  name!: string;

  @IsEmail({}, { message: 'Invalid e-mail' })
  @IsOptional()
  email!: string;
}