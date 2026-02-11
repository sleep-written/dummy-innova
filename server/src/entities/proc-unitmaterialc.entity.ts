import type { Relation } from 'typeorm';

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProcMaterialc } from './proc-materialc.entity.js';

@Entity({ name: 'proc_unitmaterialc' })
export class ProcUnitMaterialc extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id!: number;

    @Column({ type: 'int', name: 'unitid' })
    unitId!: number;

    @Column({ type: 'smallint', name: 'unittype' })
    unitType!: number;

    @ManyToOne(_ => ProcMaterialc, r => r.units)
    @JoinColumn({ name: 'materialc' })
    materialc?: Relation<ProcMaterialc> | null;
}