import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Users } from '../schema/users';
import { Model } from 'mongoose';
import { IUsersRepository } from './user.repository.interface';
@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}
  async createUser(data: Record<string, any>): Promise<Users> {
    return await this.userModel.create(data);
  }
  async findOne(query: any) {
    return await this.userModel.findOne(query);
  }
  async getAll(): Promise<Users[]> {
    return await this.userModel.find();
  }
  async findById(id: string): Promise<Users | undefined> {
    return await this.userModel.findById(id);
  }
  async updateOne(query: any, data: Record<string, any>) {
    return await this.userModel.updateOne(query, data);
  }
  
}
