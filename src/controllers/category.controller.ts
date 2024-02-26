import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryDTOPayload, CategoryDTOResponse } from 'src/dtos/category.dto';
import { CategoryService } from 'src/services/category.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from '../config/stored';
import { extname } from 'path';
import { plainToClass } from 'class-transformer';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(await this.categoryService.getAll());
  }

  @Get(':id')
  async get(@Param('id') id: number, @Res() res: Response) {
    const category = await this.categoryService.find(id);
    const response = plainToClass(CategoryDTOResponse, category);

    return res.status(HttpStatus.OK).json(response);
  }

  @Post()
  async create(@Body() payload: CategoryDTOPayload, @Res() res: Response) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.categoryService.create(payload));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() payload: CategoryDTOPayload,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.categoryService.update(id, payload));
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json(await this.categoryService.delete(id));
  }

  @Post(':id/upload-file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageConfig('categoryImage'),
      fileFilter: (req, file, callback) => {
        const extensionFile = extname(file.originalname);
        const allowedExtensions = ['jpg', 'png', 'jpeg'];

        if (allowedExtensions.includes(extensionFile)) {
          req.fileValidationError = 'Wrong file extension';
          callback(null, false);
        } else {
          const fileSize = parseInt(req.headers['Content-Length']);

          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError = 'File is too large';
            callback(null, false);
          } else {
            callback(null, true);
          }
        }
      },
    }),
  )
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Res() res: Response,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    return res
      .status(HttpStatus.OK)
      .json(await this.categoryService.uploadFile(id, file));
  }
}
