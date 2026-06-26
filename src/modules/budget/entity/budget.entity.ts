import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { Category } from '../../category/entity/category.entity';

@Entity({ name: 'budget' })
@Unique(['userId', 'categoryId', 'month'])
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ type: 'uuid', nullable: false, name: 'category_id' })
  categoryId!: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, name: 'limit_amount' })
  limitAmount!: number;

  @Column({ type: 'varchar', length: 7 })
  month!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => User, (u) => u.budgets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Category, (c) => c.budgets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category!: Category;
}
