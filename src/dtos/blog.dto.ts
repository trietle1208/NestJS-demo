import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDTO } from './base.dto';
import { Category } from 'src/entities/category.entity';

export class BlogDTOPayload extends BaseDTO {
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  category: Category;
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;
  @IsString()
  @IsNotEmpty()
  @Expose()
  desc: string;
}
