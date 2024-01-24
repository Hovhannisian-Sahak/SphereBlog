import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { userTypes } from 'src/shared/schema/users';
import { IUsersService } from './users.service.interface';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly usersService: IUsersService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return {
        success: true,
        message:
          newUser.type === userTypes.ADMIN
            ? 'Admin Created Successfully'
            : 'User Created Successfully',
        result: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error signing up. Please try again later.',
        result: null,
      };
    }
  }
}
