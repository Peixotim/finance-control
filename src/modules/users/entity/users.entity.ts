import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OutlayCategory } from '../../outlayCategory/entity/outlayCategory.entity';
import { IncomeSource } from '../../incomeSource/entity/incomeSource.entity';
import { Outlay } from '../../outlay/entity/outlay.entity';
import { Income } from '../../income/entity/income.entity';

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

  // Nullable + unique — prepared for a future WhatsApp webhook integration.
  @Column({ type: 'varchar', nullable: true, unique: true })
  phone!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => OutlayCategory, (c) => c.user)
  outlayCategories!: OutlayCategory[];

  @OneToMany(() => IncomeSource, (s) => s.user)
  incomeSources!: IncomeSource[];

  @OneToMany(() => Outlay, (o) => o.user)
  outlays!: Outlay[];

  @OneToMany(() => Income, (i) => i.user)
  incomes!: Income[];
}
