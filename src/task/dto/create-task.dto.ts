import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title: string;

  completed: boolean;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  @MinLength(5, { message: 'Description must be at least 5 characters long' })
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  description: string;
}
