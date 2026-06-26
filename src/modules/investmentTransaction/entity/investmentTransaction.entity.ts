import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Investment } from '../../investment/entity/investment.entity';
import { InvestmentOperation } from '../enum/investmentTransaction.enum';

@Entity({ name: 'investment_transaction' })
export class InvestmentTransaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'investment_id' })
  investmentId!: string;

  @Column({ type: 'enum', enum: InvestmentOperation })
  operation!: InvestmentOperation;

  @Column({ type: 'decimal', precision: 14, scale: 6 })
  quantity!: number;

  @Column({ type: 'decimal', precision: 14, scale: 6, name: 'unit_price' })
  unitPrice!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  fees!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Investment, (i) => i.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'investment_id' })
  investment!: Investment;
}
