import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Account } from '../../account/entity/account.entity';
import { Transaction } from '../../transaction/entity/transaction.entity';
import { InvoiceStatus } from '../enum/creditCardInvoice.enum';

@Entity({ name: 'credit_card_invoice' })
export class CreditCardInvoice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'date', name: 'closing_date' })
  closingDate!: Date;

  @Column({ type: 'date', name: 'due_date' })
  dueDate!: Date;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  total!: number;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.OPEN })
  status!: InvoiceStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Account, (a) => a.invoices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @OneToMany(() => Transaction, (t) => t.invoice)
  transactions!: Transaction[];
}
