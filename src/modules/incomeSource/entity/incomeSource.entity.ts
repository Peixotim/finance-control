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
import { IncomeType } from '../../incomeType/entity/incomeType.entity';
import { Income } from '../../income/entity/income.entity';

@Entity({ name: 'income_source' })
@Unique(['userId', 'name'])
export class IncomeSource {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  // Free text chosen by the user (e.g. "Salário CLT", "Freela X").
  @Column({ type: 'varchar', length: 80, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null;

  // Optional link to a canonical type — drives aggregated metrics.
  @Column({ type: 'uuid', nullable: true, name: 'income_type_id' })
  incomeTypeId!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => User, (u) => u.incomeSources, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => IncomeType, (t) => t.incomeSources, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'income_type_id' })
  incomeType!: IncomeType | null;

  @OneToMany(() => Income, (i) => i.incomeSource)
  incomes!: Income[];
}
