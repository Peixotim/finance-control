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
import { AccountType } from '../enum/account.enum';
import { Transaction } from '../../transaction/entity/transaction.entity';
import { CreditCardInvoice } from '../../creditCardInvoice/entity/creditCardInvoice.entity';
import { AccountShare } from '../../accountShare/entity/accountShare.entity';
import { Goal } from '../../goal/entity/goal.entity';
import { RecurringTransaction } from '../../recurringTransaction/entity/recurringTransaction.entity';

@Entity({ name: 'account' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'enum', enum: AccountType })
  type!: AccountType;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  balance!: number;

  @Column({ type: 'varchar', length: 3, default: 'BRL' })
  currency!: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true, name: 'credit_limit' })
  creditLimit!: number | null;

  @Column({ type: 'smallint', nullable: true, name: 'closing_day' })
  closingDay!: number | null;

  @Column({ type: 'smallint', nullable: true, name: 'due_day' })
  dueDay!: number | null;

  @Column({ type: 'boolean', default: true })
  active!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => User, (u) => u.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Transaction, (t) => t.account)
  transactions!: Transaction[];

  @OneToMany(() => CreditCardInvoice, (i) => i.account)
  invoices!: CreditCardInvoice[];

  @OneToMany(() => AccountShare, (s) => s.account)
  accountShares!: AccountShare[];

  @OneToMany(() => Goal, (g) => g.fundingAccount)
  goals!: Goal[];

  @OneToMany(() => RecurringTransaction, (r) => r.account)
  recurringTransactions!: RecurringTransaction[];
}
