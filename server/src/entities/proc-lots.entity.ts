import type { Relation } from 'typeorm';

import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProcCollections } from './proc-collections.entity.js';
import { ProcItems } from './proc-items.entity.js';
import { ProcPacks } from './proc-packs.entity.js';

@Entity({ name: 'proc_lots' })
export class ProcLots extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'lot' })
    id!: number;

    @Column({ type: 'nvarchar', length: 30 })
    code!: string;

    /**
     * Número de prepedido.
     */
    @Column({ type: 'nvarchar', length: 30, nullable: true })
    extcode?: string | null;

    @OneToMany(_ => ProcItems, r => r.procLots)
    procItems?: Relation<ProcItems[]> | null;

    @OneToMany(_ => ProcPacks, r => r.procLots)
    procPacks?: Relation<ProcPacks[]> | null;

    @OneToMany(_ => ProcCollections, r => r.procLots)
    procCollections?: Relation<ProcCollections[]> | null;
}