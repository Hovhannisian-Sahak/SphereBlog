import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Posts } from '../schema/posts';
import { Model } from 'mongoose';
import { IPostsRepository } from './post.repository.interface';
@Injectable()
export class PostRepository implements IPostsRepository {
  constructor(
    @InjectModel(Posts.name) private readonly postModel: Model<Posts>,
  ) {}
  async create(data: Record<string, any>): Promise<Posts> {
    return await this.postModel.create(data);
  }
  async findOne(query: any): Promise<Posts> {
    return await this.postModel.findOne(query);
  }
  async getAll(): Promise<Posts[]> {
    return await this.postModel.find();
  }
  async findOneAndUpdate(query: any, update: any) {
    const post = await this.postModel.findOneAndUpdate(query, update, {
      new: true,
    });
    return post;
  }
  async deleteOne(query: any) {
    const post = await this.postModel.findOneAndDelete(query);
    return post;
  }
}
