import { userTypes } from 'src/shared/schema/users';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Please enter full name' })
  @IsString({ message: 'Please enter valid name' })
  @MinLength(3, { message: 'Full name must be minimum 3 characters' })
  name: string;
  @IsEmail()
  email: string;
  @Length(8, 50, { message: 'Password length must be between 8 and 50' })
  password: string;
  @IsNotEmpty({ message: 'Please enter type' })
  @IsString({ message: 'Please enter valid type' })
  @IsIn([userTypes.ADMIN, userTypes.CUSTOMER])
  type: string;
  @IsString()
  @IsOptional()
  secretToken?: string;
  isAdmin: boolean;
}
