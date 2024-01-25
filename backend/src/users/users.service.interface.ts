import { Users } from 'src/shared/schema/users';
import { UpdateUserDto } from './dto/update-user-dto';
import { LoginUserDto } from './dto/login-user-dto';

export interface IUsersService {
  createUser(data: Record<string, any>): Promise<Users>;
  login(loginUserDto: LoginUserDto): Promise<{ user: Users; token: string }>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users>;
}
