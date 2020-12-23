import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "../entity/User";

@Entity()
export class Operation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  concept: string;

  @Column("decimal")
  amount: number;

  @Column({ type: "bool", default: true })
  type: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.operations)
  @JoinColumn({ name: "user_id" })
  user: User;
}
