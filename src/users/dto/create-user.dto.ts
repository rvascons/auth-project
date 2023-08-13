import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id?: number;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsNotEmpty()
  @IsEmail({}, {message: 'Invalid Email'})
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {message: 'Password should be at least 6 characters long'})
  public password: string;
}
