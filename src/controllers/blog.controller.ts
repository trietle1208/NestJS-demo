import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BlogDTOPayload } from 'src/dtos/blog.dto';
import { BlogService } from 'src/services/blog.service';

@Controller('/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get()
  async getAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(await this.blogService.getAll());
  }

  @Get(':id')
  async find(@Param('id') id: number, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(await this.blogService.find(id));
  }

  @Post()
  async create(@Body() payload: BlogDTOPayload, @Res() res: Response) {
    return res
      .status(HttpStatus.CREATED)
      .json(
        await this.blogService.create(BlogDTOPayload.plainToClass(payload)),
      );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: BlogDTOPayload,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.blogService.update(id, payload));
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(await this.blogService.delete(id));
  }
}
