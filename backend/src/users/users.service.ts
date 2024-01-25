import { IUsersRepository } from '../shared/repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user-dto';
import { Users, userTypes } from 'src/shared/schema/users';
import {
  comparePassword,
  generatePasswordHash,
} from 'src/shared/utils/password-manager';
import { IUsersService } from './users.service.interface';
import { generateAuthToken } from 'src/shared/utils/token-generator';
import { UpdateUserDto } from './dto/update-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { validate } from 'class-validator';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    //dependency injection
    @Inject('UserRepositoryInterface')
    private readonly userModel: IUsersRepository,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    try {
      //validate DTO
      const errors = await validate(createUserDto);
      if (errors.length > 0) {
        console.log(errors);
      }
      //generate password hash
      createUserDto.password = await generatePasswordHash(
        createUserDto.password,
      );
      //check if the person who tries to sign up as admin knows the secret key for admin
      if (
        createUserDto.type === userTypes.ADMIN &&
        createUserDto.secretToken !== process.env.ADMIN_SECRET_TOKEN
      ) {
        throw new Error('Not allowed to create admin');
        //else if type is not customer(means it admin) and everything is okey,make isAdmin true
      } else if (createUserDto.type !== userTypes.CUSTOMER) {
        createUserDto.isAdmin = true;
      }
      //check if user exists
      const user = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (user) {
        throw new Error(
          'Email address is already in use. Please use a different email address.',
        );
      }
      //creating user
      const newUser = await this.userModel.createUser({ ...createUserDto });
      //delete password from response
      delete newUser._doc.password;
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ user: Users; token: string }> {
    try {
      //validate DTO
      const errors = await validate(loginUserDto);
      if (errors.length > 0) {
        console.log(errors);
      }
      //check if email and password are valid

      const { email, password } = loginUserDto;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new Error('invalid email or password');
      }
      const isMatching = await comparePassword(password, user.password);
      if (!isMatching) {
        throw new Error('invalid email or password');
      }
      //generate token with user id(the function is in utils folder)
      const token = await generateAuthToken(user._id);
      //delete password from response
      delete user._doc.password;
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    try {
      //validate DTO
      const errors = await validate(updateUserDto);
      if (errors.length > 0) {
        console.log(errors);
      }
      const { name, oldPassword, newPassword } = updateUserDto;
      //check if both are undefined
      if (!name && !newPassword) {
        throw new Error('please provide name or password');
      }
      //find user
      const user = await this.userModel.findOne({ _id: id });
      if (!user) {
        throw new Error('user does not exist');
      }
      //if there's a new password provided then check the old one
      if (newPassword) {
        const isValidOldPassword = await comparePassword(
          oldPassword,
          user.password,
        );
        if (!isValidOldPassword) {
          throw new Error('current password is incorrect');
        }
        const hashedPassword = await generatePasswordHash(newPassword);
        await this.userModel.updateOne(
          {
            _id: id,
          },
          { password: hashedPassword },
        );
      }
      //if old password is provided but there is no new password provided throw error
      if (oldPassword && !newPassword) {
        throw new Error('please provide new password');
      }
      if (name) {
        await this.userModel.updateOne(
          {
            _id: id,
          },
          { name },
        );
      }
      //delete password from response
      delete user._doc.password;
      return user;
    } catch (error) {
      throw error;
    }
  }
}
