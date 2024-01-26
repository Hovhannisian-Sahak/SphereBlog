import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { userTypes } from 'src/shared/schema/users';
import { IUsersService } from './users.service.interface';
import { UserResponseDto } from './dto/user-response.dto';

import { validate } from 'class-validator';
import { LoginUserDto } from './dto/login-user-dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user-dto';
@Controller('users')
export class UsersController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly usersService: IUsersService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      //validate Dto
      await validate(createUserDto);
      //calling service function
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

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true })
    response: Response,
  ): Promise<UserResponseDto> {
    try {
      //validating DTO
      await validate(loginUserDto);

      //calling service function
      const loginRes = await this.usersService.login(loginUserDto);
      //save token in cookies
      response.cookie('auth_token', loginRes?.token, { httpOnly: true });
      //delete token from response
      delete loginRes?.token;
      return {
        success: true,
        message: 'Logged in successfully',
        result: loginRes,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error signing up. Please try again later.',
        result: null,
      };
    }
  }

  @Put('logout')
  async logout(@Res() response: Response) {
    //removing token from cookies
    response.clearCookie('auth_token');
    return response.status(HttpStatus.OK).json({
      success: true,
      message: 'Logout successfully',
    });
  }
  @Patch('update/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      await validate(updateUserDto);
      const updatedUser = await this.usersService.updateUser(id, updateUserDto);
      return {
        success: true,
        message: 'User updated successfully',
        result: updatedUser,
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
