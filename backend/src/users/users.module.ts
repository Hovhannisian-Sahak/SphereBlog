import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from 'src/shared/repositories/user.repository';
import { UserSchema, Users } from 'src/shared/schema/users';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: 'UserServiceInterface',
      useClass: UsersService,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UsersRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UserModule {}
