import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Please enter title' })
  @IsString({ message: 'Please enter valid title' })
  @MinLength(3, { message: 'title must be minimum 3 characters' })
  title: string;
  @IsNotEmpty({ message: 'Please enter description' })
  @MaxLength(200, { message: 'title must be minimum 3 characters' })
  description: string;
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
