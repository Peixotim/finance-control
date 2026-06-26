import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { Household } from '../../household/entity/household.entity';
import { HouseholdMemberRole } from '../enum/householdMember.enum';

@Entity({ name: 'household_member' })
@Unique(['userId', 'householdId'])
export class HouseholdMember {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ type: 'uuid', nullable: false, name: 'household_id' })
  householdId!: string;

  @Column({
    type: 'enum',
    enum: HouseholdMemberRole,
    default: HouseholdMemberRole.MEMBER,
  })
  role!: HouseholdMemberRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => User, (u) => u.householdMembers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Household, (h) => h.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'household_id' })
  household!: Household;
}
