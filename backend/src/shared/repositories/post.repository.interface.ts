import { Posts } from '../schema/posts';

export interface IPostsRepository {
  create(data: Record<string, any>): Promise<Posts>;
  findOne(query: any): Promise<Posts | undefined>;
  getAll(): Promise<Posts[]>;
  findById(id: string): Promise<Posts | undefined>;
  findOneAndUpdate(query: any, update: any);
  
  updateOne(query: any, data: Record<string, any>);
  deleteOne(query: any);
}
