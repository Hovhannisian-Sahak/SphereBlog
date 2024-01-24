import { IUsersRepository } from '../shared/repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user-dto';
import { Users, userTypes } from 'src/shared/schema/users';
import { generatePasswordHash } from 'src/shared/utils/password-manager';
import { IUsersService } from './users.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    //dependency injection
    @Inject('UserRepositoryInterface')
    private readonly userModel: IUsersRepository,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
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
      const newUser = await this.userModel.createUser({ ...createUserDto });

      return newUser;
    } catch (error) {
      throw new Error('Failed to sign up');
    }
  }
}
