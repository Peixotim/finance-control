import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { IncomeSource } from '../../incomeSource/entity/incomeSource.entity';

@Entity({ name: 'income_type' })
export class IncomeType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Stable uppercase slug without spaces (e.g. SALARY). Used for aggregated reporting.
  @Column({ type: 'varchar', length: 40, nullable: false, unique: true })
  code!: string;

  // Default display label in PT-BR (e.g. "Salário").
  @Column({ type: 'varchar', length: 80, nullable: false })
  label!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => IncomeSource, (s) => s.incomeType)
  incomeSources!: IncomeSource[];
}
