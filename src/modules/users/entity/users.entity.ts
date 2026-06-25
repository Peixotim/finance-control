import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  name!: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", nullable: true })
  phone!: string | null;

  @Column({ type: "varchar", nullable: false })
  passwordHash!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
