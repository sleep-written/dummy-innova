import type { Relation } from 'typeorm';

import { BaseEntity, Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { ProcCollections } from './proc-collections.entity.js';
import { ExpireMethod } from './expire-method.entity.js';
import { ProcOrderL } from './proc-orderl.entity.js';
import { ProcItems } from './proc-items.entity.js';

@Entity({ name: 'proc_materials' })
export class ProcMaterials extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'material' })
    id!: number;

    @Column({ type: 'nvarchar', length: 30 })
    code!: string;

    @Column({ type: 'nvarchar', length: 30 })
    name!: string;

    @Column({ type: 'bit', default: false })
    active!: boolean;

    @Column({ type: 'int', nullable: true })
    expire1?: number;

    @Column({ type: 'int' })
    systemtype!: number;

    @Column({ type: 'int', nullable: true })
    materialtype?: number;

    @ManyToOne(_ => ProcMaterials, r => r.id, { nullable: true })
    @JoinColumn({ name: 'pkpackaging' })
    taraCaja?: Relation<ProcMaterials> | null;

    @ManyToOne(_ => ProcMaterials, r => r.id, { nullable: true })
    @JoinColumn({ name: 'itpackaging' })
    taraBolsa?: Relation<ProcMaterials> | null;

    @OneToMany(_ => ProcOrderL, r => r.procMaterials)
    procOrderL?: Relation<ProcOrderL[]>;

    @OneToMany(_ => ProcOrderL, r => r.taraCaja)
    procOrderLTaraCaja?: Relation<ProcOrderL[] | null>;

    @OneToMany(_ => ProcOrderL, r => r.taraBolsa)
    procOrderLTaraBolsa?: Relation<ProcOrderL[] | null>;

    @ManyToOne(_ => ExpireMethod, r => r.procMaterials, { nullable: true })
    @JoinColumn({ name: "expire1method" })
    expire1method?: Relation<ExpireMethod | null>;

    @OneToMany(_ => ProcItems, r => r.material)
    procItems?: Relation<ProcItems[]> | null;

    @OneToMany(_ => ProcCollections, r => r.material)
    procCollections?: Relation<ProcCollections[]> | null;
}