import type { Relation } from 'typeorm';

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProcMaterials } from './proc-materials.entity.js';
import { ProcOrders } from './proc-orders.entity.js';
// import { ProcPacks } from './proc-packs.entity.js';
import { ProcLots } from './proc-lots.entity.js';

@Entity({ name: 'proc_collections' })
export class ProcCollections extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'int' })
    number!: number;

    /**
     * Cantidad de pallets (supongo).
     */
    @Column({ type: 'int', nullable: true })
    pieces?: number | null;

    /**
     * Cantidad unitaria de cueros.
     */
    @Column({ type: 'int', nullable: true })
    units?: number | null;

    /**
     * Peso neto total (o sea solo el producto).
     */
    @Column({ type: 'real', nullable: true })
    weight?: number | null;

    /**
     * Peso únicamente del envase.
     */
    @Column({ type: 'real', nullable: true })
    tare?: number | null;

    /**
     * Peso neto + tara.
     */
    @Column({ type: 'real', nullable: true })
    gross?: number | null;

    @Column({ type: 'datetime' })
    begtime?: Date;

    @Column({ type: 'datetime', nullable: true })
    endtime?: Date | null;

    @ManyToOne(_ => ProcOrders, r => r.procCollections, { nullable: true })
    @JoinColumn({ name: 'order' })
    procOrders?: Relation<ProcOrders> | null;

    @ManyToOne(_ => ProcLots, r => r.procCollections, { nullable: true })
    @JoinColumn({ name: 'lot' })
    procLots?: Relation<ProcLots> | null;
    
    @ManyToOne(_ => ProcMaterials, r => r.procItems)
    @JoinColumn({ name: 'material' })
    material?: Relation<ProcMaterials> | null;

    // @OneToMany(_ => ProcPacks, r => r.procCollections)
    // procPacks?: Relation<ProcPacks[]> | null;
}