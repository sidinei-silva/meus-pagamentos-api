import { IsString, IsEmail, MinLength } from 'class-validator';

export class ICreateUserBodyDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  id?: string;
}
