import type { Relation } from "typeorm";

import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProcMaterials } from './proc-materials.entity.js';
import { ProcOrderL } from "./proc-orderl.entity.js";

@Entity({ name: "proc_expiremethods" })
export class ProcExpireMethod extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "expiremethod" })
  id!: number;

  @Column({ type: "nvarchar", length: 30 })
  code!: string;

  @Column({ type: "nvarchar", length: 30 })
  name!: string;

  @Column({ type: "bit", default: false })
  active!: boolean;

  @OneToMany(_ => ProcOrderL, r => r.expire1method)
  orderDetails?: Relation<ProcOrderL[] | null>;

  @OneToMany(_ => ProcMaterials, r => r.expire1method)
  procMaterials?: Relation<ProcMaterials[] | null>;
}
