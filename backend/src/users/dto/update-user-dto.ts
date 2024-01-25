import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Please Enter Full Name' })
  @IsString({ message: 'Please Enter Valid Name' })
  @IsOptional()
  name?: string;

  @Length(8, 50, {
    message: 'Password length Must be between 8 and 50 charcters',
  })
  @IsOptional()
  oldPassword?: string;

  @Length(8, 50, {
    message: 'Password length Must be between 8 and 50 charcters',
  })
  @IsOptional()
  newPassword?: string;
}
