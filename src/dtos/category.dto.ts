import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from './base.dto';
import { Expose, Transform } from 'class-transformer';

export class CategoryDTOPayload extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
}

export class CategoryDTOResponse extends BaseDTO {
  @Expose()
  name: string;
  @Expose()
  @Transform((value) => {
    return `http://localhost:3000/${value.obj.file}`;
  })
  file: string;
}
