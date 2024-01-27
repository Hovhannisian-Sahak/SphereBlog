import { Posts } from '../schema/posts';

export interface IPostsRepository {
  create(data: Record<string, any>): Promise<Posts>;
  findOne(query: any): Promise<Posts | undefined>;
  getAll(): Promise<Posts[]>;
  findOneAndUpdate(query: any, update: any);
  deleteOne(query: any);
}
