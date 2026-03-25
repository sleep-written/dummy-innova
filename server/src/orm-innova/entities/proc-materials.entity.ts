import type { Relation } from 'typeorm';

import { BaseEntity, Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { ProcCollections } from './proc-collections.entity.js';
import { ProcExpireMethod } from './proc-expire-method.entity.js';
import { ProcOrderL } from './proc-orderl.entity.js';
import { ProcItems } from './proc-items.entity.js';
import { ProcMaterialtypes } from './proc-materialtypes.entity.js';

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

    @ManyToOne(_ => ProcMaterialtypes, r => r.id, { nullable: true })
    @JoinColumn({ name: 'materialtype' })
    materialtype?: Relation<ProcMaterialtypes> | null;

    // Tara caja
    @ManyToOne(_ => ProcMaterials, r => r.id, { nullable: true })
    @JoinColumn({ name: 'pkpackaging' })
    pkPackaging?: Relation<ProcMaterials> | null;

    // Tara bolsa
    @ManyToOne(_ => ProcMaterials, r => r.id, { nullable: true })
    @JoinColumn({ name: 'itpackaging' })
    itPackaging?: Relation<ProcMaterials> | null;

    @OneToMany(_ => ProcOrderL, r => r.procMaterials)
    procOrderL?: Relation<ProcOrderL[]>;

    // Tara caja
    @OneToMany(_ => ProcOrderL, r => r.pkPackaging)
    procOrderLPkPackaging?: Relation<ProcOrderL[] | null>;

    // Tara bolsa
    @OneToMany(_ => ProcOrderL, r => r.itPackaging)
    procOrderLItPackaging?: Relation<ProcOrderL[] | null>;

    @ManyToOne(_ => ProcExpireMethod, r => r.procMaterials, { nullable: true })
    @JoinColumn({ name: "expire1method" })
    expire1method?: Relation<ProcExpireMethod | null>;

    @OneToMany(_ => ProcItems, r => r.material)
    procItems?: Relation<ProcItems[]> | null;

    @OneToMany(_ => ProcCollections, r => r.material)
    procCollections?: Relation<ProcCollections[]> | null;
}