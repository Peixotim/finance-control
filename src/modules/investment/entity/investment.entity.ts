import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { AssetType } from '../enum/investment.enum';
import { InvestmentTransaction } from '../../investmentTransaction/entity/investmentTransaction.entity';

@Entity({ name: 'investment' })
@Unique(['userId', 'ticker'])
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ type: 'varchar', length: 20 })
  ticker!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'enum', enum: AssetType, name: 'asset_type' })
  assetType!: AssetType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => User, (u) => u.investments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => InvestmentTransaction, (t) => t.investment)
  transactions!: InvestmentTransaction[];
}
