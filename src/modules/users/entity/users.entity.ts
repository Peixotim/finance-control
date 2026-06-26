import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { HouseholdMember } from '../../householdMember/entity/householdMember.entity';
import { Account } from '../../account/entity/account.entity';
import { Category } from '../../category/entity/category.entity';
import { Budget } from '../../budget/entity/budget.entity';
import { Goal } from '../../goal/entity/goal.entity';
import { RecurringTransaction } from '../../recurringTransaction/entity/recurringTransaction.entity';
import { Investment } from '../../investment/entity/investment.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', nullable: false, name: 'password_hash' })
  passwordHash!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => HouseholdMember, (m) => m.user)
  householdMembers!: HouseholdMember[];

  @OneToMany(() => Account, (a) => a.user)
  accounts!: Account[];

  @OneToMany(() => Category, (c) => c.user)
  categories!: Category[];

  @OneToMany(() => Budget, (b) => b.user)
  budgets!: Budget[];

  @OneToMany(() => Goal, (g) => g.user)
  goals!: Goal[];

  @OneToMany(() => RecurringTransaction, (r) => r.user)
  recurringTransactions!: RecurringTransaction[];

  @OneToMany(() => Investment, (i) => i.user)
  investments!: Investment[];
}
