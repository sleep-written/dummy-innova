import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from 'typeorm';

import { ProcCollections } from './proc-collections.entity.js';
import { ProcLots } from './proc-lots.entity.js';

@Entity({ name: 'proc_packs' })
export class ProcPacks extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'real', nullable: true })
    tare?: number | null;

    @Column({ type: 'real', nullable: true })
    gross?: number | null;

    @Column({ type: 'nvarchar', length: 80, nullable: true })
    extcode?: number | null;

    @Column({ type: 'int', nullable: true })
    pallet?: number | null;

    @ManyToOne(_ => ProcLots, r => r.procPacks, { nullable: true })
    @JoinColumn({ name: 'lot' })
    procLots?: Relation<ProcLots> | null;

    // @ManyToOne(_ => ProcCollections, r => r.procPacks, { nullable: true })
    // @JoinColumn({ name: 'pallet' })
    // procCollections?: Relation<ProcCollections> | null;
}