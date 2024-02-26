import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogDTOPayload } from 'src/dtos/blog.dto';
import { Blog } from 'src/entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  getAll(): Promise<Blog[]> {
    try {
      const blogs = this.blogRepository.find({
        relations: {
          category: true,
        },
      });

      return blogs;
    } catch (error) {
      return error;
    }
  }

  async find(id: number): Promise<Blog> {
    try {
      const blog = await this.blogRepository.findOne({
        where: { id: id },
        relations: {
          category: true,
        },
      });

      if (!blog) {
        throw new NotFoundException('The blog does not exist');
      }

      return blog;
    } catch (error) {
      return error;
    }
  }

  create(payload: BlogDTOPayload): Promise<Blog> {
    console.log(BlogDTOPayload.plainToClass(payload));
    try {
      const blog = this.blogRepository.save(payload);

      return blog;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, payload: BlogDTOPayload) {
    try {
      const blog = await this.blogRepository.findOneBy({ id });

      if (!blog) {
        throw new NotFoundException('The blog does not exist');
      }

      await this.blogRepository.update(
        id,
        BlogDTOPayload.plainToClass(payload),
      );

      return await this.blogRepository.findOne({
        where: { id: id },
        relations: {
          category: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const blog = await this.blogRepository.findOneBy({ id });

      if (!blog) {
        throw new NotFoundException('The blog does not exist');
      }

      this.blogRepository.delete({ id });
    } catch (error) {
      return error;
    }
  }
}
