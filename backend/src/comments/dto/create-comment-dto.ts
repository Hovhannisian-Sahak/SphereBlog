import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Please enter comment' })
  @IsString({ message: 'Please enter valid comment' })
  @MinLength(3, { message: 'comment must be minimum 3 characters' })
  comment: string;
}
