import { BeforeRemove, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Blog } from './blog.entity';
import * as fs from 'fs';

@Entity({
  name: 'categories',
})
export class Category extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @Column()
  file: string;

  @OneToMany(() => Blog, (blog) => blog.category)
  blogs: Blog[];

  @BeforeUpdate()
  async beforeUpdate() {
    await this.deleteImage();
  }

  @BeforeRemove()
  async beforeRemove() {
    await this.deleteImage();
  }

  private async deleteImage() {
    try {
      console.log(this.file);
      if (this.file) {
        fs.unlinkSync(this.file);
      }
    } catch (error) {
      return error;
    }
  }
}
