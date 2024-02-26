import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDTOPayload } from '../dtos/category.dto';
import * as fs from 'fs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  getAll(): Promise<Category[]> {
    try {
      return this.categoryRepository.find({
        relations: {
          blogs: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async find(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: id },
        relations: {
          blogs: true,
        },
      });
      if (!category) {
        throw new NotFoundException('The category does not exist');
      }

      return category;
    } catch (error) {
      return error;
    }
  }

  create(payload: CategoryDTOPayload): Promise<Category> {
    try {
      const category = this.categoryRepository.save(
        CategoryDTOPayload.plainToClass(payload),
      );

      return category;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, payload: CategoryDTOPayload): Promise<any> {
    try {
      const category = await this.categoryRepository.findOneBy({ id });

      if (!category) {
        throw new NotFoundException('The category does not exist');
      }

      await this.categoryRepository.update(
        id,
        CategoryDTOPayload.plainToClass(payload),
      );

      return await this.categoryRepository.findOne({
        where: { id: id },
        relations: {
          blogs: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const category = await this.categoryRepository.findOneBy({ id });

      if (!category) {
        throw new NotFoundException('The category does not exist');
      }

      await this.categoryRepository.remove(category);
    } catch (error) {
      return error;
    }
  }

  async uploadFile(id: number, file: Express.Multer.File) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException('The category does not exist');
    }

    if (category.file) {
      fs.unlinkSync(category.file);
    }
    this.categoryRepository.update(id, {
      file: file.destination + '/' + file.filename,
    });
  }
}
