/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  contents: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
