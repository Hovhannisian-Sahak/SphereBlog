import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Posts } from 'src/shared/schema/posts';
import { AuthMiddleware } from 'src/shared/middleware/auth';
import { UsersRepository } from 'src/shared/repositories/user.repository';
import { UserSchema, Users } from 'src/shared/schema/users';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/shared/middleware/role.guard';
import { CommentsRepository } from 'src/shared/repositories/comment.repository';
import { CommentSchema, Comments } from 'src/shared/schema/comments';
@Module({
  providers: [
    UsersRepository,
    PostsService,
    PostRepository,
    {
      provide: 'PostServiceInterface',
      useClass: PostsService,
    },
    {
      provide: 'PostRepositoryInterface',
      useClass: PostRepository,
    },
    {
      provide: 'CommentRepositoryInterface',
      useClass: CommentsRepository,
    },

    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Posts.name,
        schema: PostSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Comments.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [PostsController],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: 'posts',
          method: RequestMethod.GET,
        },
        {
          path: 'posts/:id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(PostsController);
  }
}
