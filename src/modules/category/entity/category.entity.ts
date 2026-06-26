import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { CategoryKind } from '../enum/category.enum';
import { Transaction } from '../../transaction/entity/transaction.entity';
import { Budget } from '../../budget/entity/budget.entity';
import { RecurringTransaction } from '../../recurringTransaction/entity/recurringTransaction.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  name!: string;

  @Column({ type: 'enum', enum: CategoryKind })
  kind!: CategoryKind;

  @Column({ type: 'uuid', nullable: true, name: 'parent_id' })
  parentId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  icon!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => User, (u) => u.categories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Category, (c) => c.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent!: Category | null;

  @OneToMany(() => Category, (c) => c.parent)
  children!: Category[];

  @OneToMany(() => Transaction, (t) => t.category)
  transactions!: Transaction[];

  @OneToMany(() => Budget, (b) => b.category)
  budgets!: Budget[];

  @OneToMany(() => RecurringTransaction, (r) => r.category)
  recurringTransactions!: RecurringTransaction[];
}
