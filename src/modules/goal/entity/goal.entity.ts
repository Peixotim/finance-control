import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { Account } from '../../account/entity/account.entity';

@Entity({ name: 'goal' })
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, name: 'target_amount' })
  targetAmount!: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0, name: 'current_amount' })
  currentAmount!: number;

  @Column({ type: 'date', nullable: true, name: 'target_date' })
  targetDate!: Date | null;

  @Column({ type: 'uuid', nullable: true, name: 'funding_account_id' })
  fundingAccountId!: string | null;

  @Column({ type: 'boolean', default: false })
  achieved!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => User, (u) => u.goals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Account, (a) => a.goals, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'funding_account_id' })
  fundingAccount!: Account | null;
}
