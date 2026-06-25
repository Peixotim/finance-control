import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HouseHold } from "../../houseHold/entity/houseHold.entity";
import { Roles } from "../enum/houseHoldMember.enum";

@Entity({ name: "house_hold_member" })
export class HouseHoldMember {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  //Verificar Relacionamento Antes de fazer a migration
  @ManyToOne(() => HouseHold, (houseHold) => houseHold.houseHoldMembers)
  houseHold!: HouseHold;

  @Column({ type: "enum", enum: Roles })
  roles!: Roles;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
