import { Comments } from './../schema/comments';

export interface ICommentsRepository {
  create(data: Record<string, any>): Promise<Comments>;
  findOne(query: any): Promise<Comments | undefined>;
  getAll(): Promise<Comments[]>;
  find(query: any): Promise<Comments[]>;
  findById(id: string): Promise<Comments | undefined>;
  findOneAndUpdate(query: any, update: any);
  deleteMany(query: any);
  updateOne(query: any, data: Record<string, any>);
  deleteOne(query: any);
}
