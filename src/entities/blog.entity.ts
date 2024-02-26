import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';

@Entity({
  name: 'blogs',
})
export class Blog extends BaseEntity {
  @Column()
  name: string;

  @Column()
  desc: string;

  @ManyToOne(() => Category, (category) => category.blogs)
  category: Category;
}
