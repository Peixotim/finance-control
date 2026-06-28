import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OutlayCategory } from '../../outlayCategory/entity/outlayCategory.entity';

@Entity({ name: 'outlay_type' })
export class OutlayType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Stable uppercase slug without spaces (e.g. FOOD). Used for aggregated reporting.
  @Column({ type: 'varchar', length: 40, nullable: false, unique: true })
  code!: string;

  // Default display label in PT-BR (e.g. "Alimentação").
  @Column({ type: 'varchar', length: 80, nullable: false })
  label!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => OutlayCategory, (c) => c.outlayType)
  outlayCategories!: OutlayCategory[];
}
