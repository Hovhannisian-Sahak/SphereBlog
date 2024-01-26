import { Comments } from './../shared/schema/comments';
import { CreateCommentDto } from './dto/create-comment-dto';

export interface ICommentsService {
  create(
    userId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comments>;
  getCommentbyPostId(postId: string): Promise<Comments[]>;
  delete(userId: string, id: string);
  deleteByAdmin(id: string);
}
