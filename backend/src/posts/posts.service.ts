import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IPostsRepository } from 'src/shared/repositories/post.repository.interface';
import { CreatePostDto } from './dto/create-post-dto';
import { Posts } from 'src/shared/schema/posts';
import { UpdatePostDto } from './dto/update-post-dto';
import { validate } from 'class-validator';
import mongoose from 'mongoose';
import { ICommentsRepository } from 'src/shared/repositories/comment.repository.interface';

@Injectable()
export class PostsService {
  constructor(
    //dependency injection
    @Inject('PostRepositoryInterface')
    private readonly postModel: IPostsRepository,
    @Inject('CommentRepositoryInterface')
    private readonly commentModel: ICommentsRepository,
  ) {}

  async create(userId: string, createPostDto: CreatePostDto): Promise<Posts> {
    try {
      //validate DTO
      await validate(createPostDto);

      const post = await this.postModel.create({ ...createPostDto, userId });

      return post;
    } catch (error) {
      throw error;
    }
  }
  async getPost(id: string): Promise<Posts> {
    try {
      const post = await this.postModel.findOne({ _id: id });
      if (!post) {
        throw new NotFoundException('Blog post not found');
      }
      return post;
    } catch (error) {
      throw error;
    }
  }
  async getAllPosts(): Promise<Posts[]> {
    try {
      const posts = await this.postModel.getAll();
      console.log(posts);
      if (!posts || posts.length === 0) {
        throw new NotFoundException('posts are not found');
      }
      return posts;
    } catch (error) {
      throw error;
    }
  }
  async updatePost(
    userId: string,
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Posts> {
    try {
      //validate DTO
      await validate(updatePostDto);
      const post = await this.postModel.findOne({ _id: id });

      if (!post) {
        throw new NotFoundException('Blog post not found');
      }
      //check current user
      if (post.userId.toString() !== userId.toString()) {
        throw new UnauthorizedException('You are not the author of this post');
      }
      const updatedPost = await this.postModel.findOneAndUpdate(
        { _id: id },
        updatePostDto,
      );

      return updatedPost;
    } catch (error) {
      throw error;
    }
  }
  async delete(userId: string, id: string) {
    try {
      const post = await this.postModel.findOne({ _id: id });
      console.log(post);
      if (!post) {
        throw new NotFoundException('Blog post not found');
      }
      console.log('then');
      //check current user
      if (post.userId.toString() !== userId.toString()) {
        throw new UnauthorizedException('You are not the author of this post');
      }
      console.log(post._id.toString());
      console.log(id);
      await this.commentModel.deleteMany({ postId: post._id.toString() });
      await this.postModel.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }
  async deleteByAdmin(id: string) {
    try {
      const post = await this.postModel.findOne({ _id: id });
      console.log(post);
      if (!post) {
        throw new Error('Blog post not found');
      }

      await this.postModel.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}
