import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignUpRequestBody {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
