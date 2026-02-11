import type { Relation } from "typeorm";

import {
  BaseEntity,
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProcOrderL } from "./proc-orderl.entity.js";

@Entity({ name: "proc_layouts" })
export class ProcLayouts extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "layout" })
  id!: number;

  @Column({ type: "nvarchar", length: 30 })
  code!: string;

  @Column({ type: "nvarchar", length: 30 })
  name!: string;

  @Column({ type: "bit", default: false })
  active!: boolean;

  @OneToMany(_ => ProcOrderL, r => r.procLayoutIT)
  orderDetailsIT?: Relation<ProcOrderL[]>;

  @OneToMany(_ => ProcOrderL, r => r.procLayoutPK)
  orderDetailsPK?: Relation<ProcOrderL[]>;
}
