import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { HouseholdMember } from '../../householdMember/entity/householdMember.entity';
import { AccountShare } from '../../accountShare/entity/accountShare.entity';

@Entity({ name: 'household' })
export class Household {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => HouseholdMember, (m) => m.household)
  members!: HouseholdMember[];

  @OneToMany(() => AccountShare, (s) => s.household)
  accountShares!: AccountShare[];
}
