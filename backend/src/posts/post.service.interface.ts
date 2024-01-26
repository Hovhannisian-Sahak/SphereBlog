import { Posts } from 'src/shared/schema/posts';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

export interface IPostsService {
  create(userId: string, createPostDto: CreatePostDto): Promise<Posts>;
  getPost(id: string): Promise<Posts>;
  updatePost(
    userId: string,
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Posts>;
  getAllPosts(): Promise<Posts[]>;
  delete(userId: string, id: string);
  deleteByAdmin(id: string);
}
