import { Comments } from './../schema/comments';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICommentsRepository } from './comment.repository.interface';
@Injectable()
export class CommentsRepository implements ICommentsRepository {
  constructor(
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
  ) {}
  async create(data: Record<string, any>): Promise<Comments> {
    return await this.commentModel.create(data);
  }
  async findOne(query: any): Promise<Comments> {
    return await this.commentModel.findOne(query);
  }
  async find(query: any): Promise<Comments[]> {
    return await this.commentModel.find(query);
  }
  async findOneAndUpdate(query: any, update: any) {
    const product = await this.commentModel.findOneAndUpdate(query, update, {
      new: true,
    });
    return product;
  }
  async getAll(): Promise<Comments[]> {
    return await this.commentModel.find();
  }
  async findById(id: string): Promise<Comments | undefined> {
    return await this.commentModel.findById(id);
  }
  async updateOne(query: any, data: Record<string, any>) {
    return await this.commentModel.updateOne(query, data);
  }
  async deleteOne(query: any) {
    return await this.commentModel.findOneAndDelete(query);
  }
  async deleteMany(query: any) {
    await this.commentModel.deleteMany(query);
  }
}
