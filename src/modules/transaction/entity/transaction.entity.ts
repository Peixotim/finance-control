import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Account } from '../../account/entity/account.entity';
import { Category } from '../../category/entity/category.entity';
import { CreditCardInvoice } from '../../creditCardInvoice/entity/creditCardInvoice.entity';
import { RecurringTransaction } from '../../recurringTransaction/entity/recurringTransaction.entity';
import { Installment } from '../../installment/entity/installment.entity';
import { TransactionType } from '../enum/transaction.enum';

@Entity({ name: 'transaction' })
@Index(['accountId', 'date'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'uuid', nullable: true, name: 'category_id' })
  categoryId!: string | null;

  @Column({ type: 'uuid', nullable: true, name: 'invoice_id' })
  invoiceId!: string | null;

  @Column({ type: 'uuid', nullable: true, name: 'recurring_id' })
  recurringId!: string | null;

  // Logical reference linking both legs of a transfer; no FK constraint by design.
  @Column({ type: 'uuid', nullable: true, name: 'transfer_pair_id' })
  transferPairId!: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount!: number;

  @Column({ type: 'enum', enum: TransactionType })
  type!: TransactionType;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @Column({ type: 'smallint', default: 1, name: 'installments_count' })
  installmentsCount!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Account, (a) => a.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @ManyToOne(() => Category, (c) => c.transactions, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category!: Category | null;

  @ManyToOne(() => CreditCardInvoice, (i) => i.transactions, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'invoice_id' })
  invoice!: CreditCardInvoice | null;

  @ManyToOne(() => RecurringTransaction, (r) => r.transactions, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'recurring_id' })
  recurring!: RecurringTransaction | null;

  @OneToMany(() => Installment, (i) => i.transaction)
  installments!: Installment[];
}
