import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';

import { Roles } from 'src/shared/middleware/role.decorator';
import { userTypes } from 'src/shared/schema/users';
import { validate } from 'class-validator';
import { ICommentsService } from './comments.service.interface';
import { CommentResponseDto } from './dto/comment-response-dto';
import { CreateCommentDto } from './dto/create-comment-dto';

@Controller('comments')
export class CommentsController {
  constructor(
    @Inject('CommentServiceInterface')
    private readonly commentService: ICommentsService,
  ) {}
  @Post(':postId')
  @Roles(userTypes.CUSTOMER)
  async createPost(
    @Req() req: any,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    try {
      //validate DTO
      await validate(createCommentDto);

      //create post with userID
      const post = await this.commentService.create(
        req.user._id,
        postId,
        createCommentDto,
      );
      return {
        success: true,
        message: 'Comment created successfully',
        result: post,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.message || 'Error creating comment. Please try again later.',
        result: null,
      };
    }
  }
  @Get(':postId')
  @HttpCode(200)
  async getComments(
    @Param('postId') postId: string,
  ): Promise<CommentResponseDto> {
    try {
      const comments = await this.commentService.getCommentbyPostId(postId);

      return {
        success: true,
        message: 'comments fetched successfully',
        result: comments,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.message || 'Error getting comments. Please try again later.',
        result: null,
      };
    }
  }

  @Delete(':id')
  @Roles(userTypes.CUSTOMER)
  async delete(
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<CommentResponseDto> {
    try {
      console.log('start controller');
      await this.commentService.delete(req.user._id, id);
      console.log('end controller');
      return {
        success: true,
        message: 'Comment deleted successfully',
        result: null,
      };
    } catch (error) {
      return {
        success: true,
        message:
          error.message || 'Error deleting comment. Please try again later.',
        result: null,
      };
    }
  }
  @Delete('/admin/:id')
  @Roles(userTypes.ADMIN)
  async deleteByAdmin(@Param('id') id: string): Promise<CommentResponseDto> {
    try {
      await this.commentService.deleteByAdmin(id);

      return {
        success: true,
        message: 'comment deleted successfully',
        result: null,
      };
    } catch (error) {
      return {
        success: true,
        message:
          error.message || 'Error deleting comment. Please try again later.',
        result: null,
      };
    }
  }
}
