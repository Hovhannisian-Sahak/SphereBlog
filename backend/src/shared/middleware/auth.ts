import {
  Inject,
  Injectable,
  UnauthorizedException,
  NestMiddleware,
} from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';
import { decodeAuthToken } from '../utils/token-generator';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(UsersRepository) private readonly userDB: UsersRepository,
  ) {}
  async use(req: Request | any, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.auth_token;
      if (!token) {
        throw new UnauthorizedException('Missing Auth token');
      }
      const decoded: any = decodeAuthToken(token);
      //   const decodedString = JSON.stringify(decoded, null, 2);
      const user = await this.userDB.findById(decoded._id);
      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }
      user.password = undefined;
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
