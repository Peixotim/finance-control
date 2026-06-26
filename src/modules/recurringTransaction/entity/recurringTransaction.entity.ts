import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { Account } from '../../account/entity/account.entity';
import { Category } from '../../category/entity/category.entity';
import { Transaction } from '../../transaction/entity/transaction.entity';
import { TransactionType } from '../../transaction/enum/transaction.enum';
import { RecurringFrequency } from '../enum/recurringTransaction.enum';

@Entity({ name: 'recurring_transaction' })
export class RecurringTransaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ type: 'uuid', nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'uuid', nullable: true, name: 'category_id' })
  categoryId!: string | null;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount!: number;

  @Column({ type: 'enum', enum: TransactionType })
  type!: TransactionType;

  @Column({ type: 'enum', enum: RecurringFrequency })
  frequency!: RecurringFrequency;

  @Column({ type: 'date', name: 'next_run_date' })
  nextRunDate!: Date;

  @Column({ type: 'date', nullable: true, name: 'end_date' })
  endDate!: Date | null;

  @Column({ type: 'boolean', default: true })
  active!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => User, (u) => u.recurringTransactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Account, (a) => a.recurringTransactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @ManyToOne(() => Category, (c) => c.recurringTransactions, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category!: Category | null;

  @OneToMany(() => Transaction, (t) => t.recurring)
  transactions!: Transaction[];
}
