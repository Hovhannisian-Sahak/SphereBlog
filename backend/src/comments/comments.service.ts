import { Comments } from './../shared/schema/comments';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateCommentDto } from './dto/create-comment-dto';
import { Types } from 'mongoose';
import { IPostsRepository } from 'src/shared/repositories/post.repository.interface';
import { ICommentsService } from './comments.service.interface';
import { ICommentsRepository } from 'src/shared/repositories/comment.repository.interface';

@Injectable()
export class CommentsService implements ICommentsService {
  constructor(
    //dependency injection
    @Inject('CommentRepoInterface')
    private readonly commentModel: ICommentsRepository,
    @Inject('PostRepositoryInterfaceInService')
    private readonly postModel: IPostsRepository,
  ) {}

  async create(
    userId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comments> {
    try {
      //validate DTO
      await validate(createCommentDto);

      const post = await this.postModel.findOne({ _id: postId });
      if (!post) {
        throw new NotFoundException('Blog post not found');
      }
      const comment = await this.commentModel.create({
        ...createCommentDto,
        userId,
        postId,
      });

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async getCommentbyPostId(postId: string): Promise<Comments[]> {
    try {
      const post = await this.postModel.findOne({ _id: postId });
      console.log(post);
      if (!post) {
        throw new Error('Blog post not found');
      }
      const comments = await this.commentModel.find({ postId: postId });
      if (!comments || comments.length === 0) {
        throw new NotFoundException('there are no comments for this post');
      }
      return comments;
    } catch (error) {
      throw error;
    }
  }
  async delete(userId: string, id: string) {
    try {
      console.log('start service');
      const comment = await this.commentModel.findOne({ _id: id });
      console.log(comment);
      if (!comment) {
        console.log('chka');
        throw new NotFoundException('Comment not found');
      }
      //check current user
      if (comment.userId.toString() !== userId.toString()) {
        throw new UnauthorizedException(
          'You are not the author of this comment',
        );
      }

      await this.commentModel.deleteOne({ _id: id });
      console.log('end service');
    } catch (error) {
      throw error;
    }
  }
  async deleteByAdmin(id: string) {
    try {
      const comment = await this.commentModel.findOne({ _id: id });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      await this.commentModel.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}
