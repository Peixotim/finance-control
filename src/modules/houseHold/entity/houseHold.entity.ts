import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { HouseHoldMember } from "../../houseHoldMember/entity/houseHoldMember.entity";

@Entity({ name: "house_hold" })
export class HouseHold {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  //Verificar Relacionamento Antes de fazer a migration
  @OneToMany(() => HouseHoldMember, (member) => member.houseHold)
  houseHoldMembers!: HouseHoldMember[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
