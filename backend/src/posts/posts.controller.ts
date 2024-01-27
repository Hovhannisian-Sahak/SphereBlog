import { UpdatePostDto } from './dto/update-post-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { IPostsService } from './post.service.interface';
import { CreatePostDto } from './dto/create-post-dto';
import { Roles } from 'src/shared/middleware/role.decorator';
import { userTypes } from 'src/shared/schema/users';
import { PostResponseDto } from './dto/post-response-dto';
import { validate } from 'class-validator';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject('PostServiceInterface')
    private readonly postsService: IPostsService,
  ) {}
  @Post()
  @HttpCode(201)
  @Roles(userTypes.CUSTOMER)
  async createPost(
    @Req() req: any,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostResponseDto> {
    try {
      //validate DTO
      await validate(createPostDto);

      //create post with userID
      const post = await this.postsService.create(req.user._id, createPostDto);
      return {
        success: true,
        message: 'Post created successfully',
        result: post,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.message || 'Error creating post. Please try again later.',
        result: null,
      };
    }
  }
  @Get()
  @HttpCode(200)
  async getAllPosts(): Promise<PostResponseDto> {
    try {
      const posts = await this.postsService.getAllPosts();
      if (!posts) {
        throw new NotFoundException('posts not found');
      }
      return {
        success: false,
        message: 'posts fetched successfully',
        result: posts,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.message || 'Error getting posts. Please try again later.',
        result: null,
      };
    }
  }
  @Get(':id')
  @HttpCode(200)
  async getPostById(@Param('id') id: string): Promise<PostResponseDto> {
    try {
      const post = await this.postsService.getPost(id);

      return {
        success: true,
        message: 'Post returned successfully',
        result: post,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error getting post. Please try again later.',
        result: null,
      };
    }
  }
  @Put('/:id')
  @HttpCode(200)
  @Roles(userTypes.CUSTOMER)
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    try {
      //validate DTO
      await validate(updatePostDto);

      const updatedPost = await this.postsService.updatePost(
        req.user._id,
        id,
        updatePostDto,
      );
      return {
        success: true,
        message: 'Post updated successfully',
        result: updatedPost,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.message || 'Error updating post. Please try again later.',
        result: null,
      };
    }
  }
  @Delete(':id')
  @Roles(userTypes.CUSTOMER)
  async delete(
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<PostResponseDto> {
    try {
      await this.postsService.delete(req.user._id, id);
      return {
        success: true,
        message: 'Post deleted successfully',
        result: null,
      };
    } catch (error) {
      return {
        success: true,
        message:
          error.message || 'Error deleting post. Please try again later.',
        result: null,
      };
    }
  }
}
