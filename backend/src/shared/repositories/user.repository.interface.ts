import { Users } from '../schema/users';

export interface IUsersRepository {
  createUser(data: Record<string, any>): Promise<Users>;
  findOne(query: any): Promise<Users | undefined>;
  getAll(): Promise<Users[]>;
  findById(id: string): Promise<Users | undefined>;
  updateOne(query: any, data: Record<string, any>);
}
