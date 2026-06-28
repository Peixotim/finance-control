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
import { OutlayType } from '../../outlayType/entity/outlayType.entity';
import { Outlay } from '../../outlay/entity/outlay.entity';

@Entity({ name: 'outlay_category' })
@Unique(['userId', 'name'])
export class OutlayCategory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId!: string;

  // Free text chosen by the user (e.g. "iFood", "Uber").
  @Column({ type: 'varchar', length: 80, nullable: false })
  name!: string;

  // Optional link to a canonical type — drives aggregated metrics.
  @Column({ type: 'uuid', nullable: true, name: 'outlay_type_id' })
  outlayTypeId!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => User, (u) => u.outlayCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => OutlayType, (t) => t.outlayCategories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'outlay_type_id' })
  outlayType!: OutlayType | null;

  @OneToMany(() => Outlay, (o) => o.category)
  outlays!: Outlay[];
}
