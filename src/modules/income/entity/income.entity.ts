import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { IncomeSource } from '../../incomeSource/entity/incomeSource.entity';

@Entity({ name: 'income' })
@Index(['userId', 'receivedAt'])
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Direct owner — always present, enables flat queries without a JOIN.
  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ type: 'uuid', nullable: true, name: 'income_source_id' })
  incomeSourceId!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: false })
  amount!: number;

  // Date the income was received.
  @Column({ type: 'date', nullable: false, name: 'received_at' })
  receivedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => User, (u) => u.incomes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => IncomeSource, (s) => s.incomes, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'income_source_id' })
  incomeSource!: IncomeSource | null;
}
