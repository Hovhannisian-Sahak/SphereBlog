import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;
  @Length(8, 50, { message: 'Password length must be between 8 and 50' })
  password: string;
}
