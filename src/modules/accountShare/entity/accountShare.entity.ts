// Edit permission on a shared account is derived from the user's HouseholdMember.role
// in the referenced household: 'owner' can edit, 'member' can only view.
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Account } from '../../account/entity/account.entity';
import { Household } from '../../household/entity/household.entity';

@Entity({ name: 'account_share' })
@Unique(['accountId', 'householdId'])
export class AccountShare {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'account_id' })
  accountId!: string;

  @Column({ type: 'uuid', nullable: false, name: 'household_id' })
  householdId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Account, (a) => a.accountShares, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @ManyToOne(() => Household, (h) => h.accountShares, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'household_id' })
  household!: Household;
}
