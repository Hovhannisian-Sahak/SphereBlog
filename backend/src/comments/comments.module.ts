import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsRepository } from 'src/shared/repositories/comment.repository';
import { UsersRepository } from 'src/shared/repositories/user.repository';
import { APP_GUARD } from '@nestjs/core';
import { CommentSchema, Comments } from 'src/shared/schema/comments';
import { UserSchema, Users } from 'src/shared/schema/users';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/shared/middleware/role.guard';
import { CommentsController } from './comments.controller';
import { AuthMiddleware } from 'src/shared/middleware/auth';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { PostSchema, Posts } from 'src/shared/schema/posts';

@Module({
  providers: [
    UsersRepository,
    PostRepository,
    CommentsService,
    CommentsRepository,
    {
      provide: 'CommentServiceInterface',
      useClass: CommentsService,
    },
    {
      provide: 'CommentRepoInterface',
      useClass: CommentsRepository,
    },
    {
      provide: 'PostRepositoryInterfaceInService',
      useClass: PostRepository,
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
  controllers: [CommentsController],
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      //   .exclude(
      //     {
      //       path: 'posts',
      //       method: RequestMethod.GET,
      //     },
      //     {
      //       path: 'posts/:id',
      //       method: RequestMethod.GET,
      //     },
      //   )
      .forRoutes(CommentsController);
  }
}
