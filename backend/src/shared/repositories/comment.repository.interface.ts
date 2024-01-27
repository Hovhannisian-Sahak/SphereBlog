import { Comments } from './../schema/comments';

export interface ICommentsRepository {
  create(data: Record<string, any>): Promise<Comments>;
  findOne(query: any): Promise<Comments | undefined>;
  find(query: any): Promise<Comments[]>;
  deleteMany(query: any);
  deleteOne(query: any);
}
