import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { OutlayCategory } from '../../outlayCategory/entity/outlayCategory.entity';

@Entity({ name: 'outlay' })
@Index(['userId', 'date'])
export class Outlay {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Direct owner — always present, enables flat queries without a JOIN.
  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  @Column({ type: 'uuid', nullable: true, name: 'category_id' })
  categoryId!: string | null;

  // Optional free text (e.g. "Almoço com cliente").
  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: false })
  amount!: number;

  // Date the outlay actually happened.
  @Column({ type: 'date', nullable: false })
  date!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => User, (u) => u.outlays, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => OutlayCategory, (c) => c.outlays, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category!: OutlayCategory | null;
}
