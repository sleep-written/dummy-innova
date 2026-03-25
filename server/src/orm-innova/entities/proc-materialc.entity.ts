import type { Relation } from 'typeorm';

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProcExpireMethod } from './proc-expire-method.entity.js';
import { ProcMaterials } from './proc-materials.entity.js';
import { BaseCompanies } from './base-companies.entity.js';
import { ProcLayouts } from './proc-layouts.entity.js';

@Entity({ name: 'proc_materialc' })
export class ProcMaterialc extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'bit' })
    active!: boolean;

    @Column({ type: 'nvarchar', length: 80, nullable: true })
    description1?: string | null;

    /**
     * Vencimiento.
     */
    @Column({ type: 'int', nullable: true })
    expire1?: number | null;

    @Column({ type: 'smallint', nullable: true })
    packsizeum?: number;

    @Column({ type: 'smallint', nullable: true })
    stacksizeum?: number;

    @Column({ type: 'smallint', nullable: true })
    palletpsizeum?: number;

    @Column({ type: 'smallint', nullable: true })
    palletssizeum?: number;

    @ManyToOne(_ => ProcMaterials, r => r.id)
    @JoinColumn({ name: 'material' })
    material?: Relation<ProcMaterials> | null;

    @ManyToOne(_ => BaseCompanies, r => r.id)
    @JoinColumn({ name: 'customer' })
    customer?: Relation<BaseCompanies> | null;

    @ManyToOne(_ => ProcMaterials, r => r.id, { nullable: true })
    @JoinColumn({ name: 'packaging' })
    packaging?: Relation<ProcMaterials> | null;

    @ManyToOne(_ => ProcMaterials, r => r.id, { nullable: true })
    @JoinColumn({ name: 'pkpackaging' })
    pkPackaging?: Relation<ProcMaterials> | null;

    @ManyToOne(_ => ProcMaterials, r => r.id, { nullable: true })
    @JoinColumn({ name: 'itpackaging' })
    itPackaging?: Relation<ProcMaterials> | null;

    /**
     * Internal layout (etiqueta).
     */
    @ManyToOne(_ => ProcLayouts, r => r.orderDetailsIT, { nullable: true })
    @JoinColumn({ name: 'itlayout' })
    procLayoutIT?: Relation<ProcLayouts | null>;

    /**
     * External layout (etiqueta).
     */
    @ManyToOne(_ => ProcLayouts, r => r.orderDetailsPK, { nullable: true })
    @JoinColumn({ name: 'pklayout' })
    procLayoutPK?: Relation<ProcLayouts | null>;

    @ManyToOne(_ => ProcExpireMethod, r => r.procMaterials, { nullable: true })
    @JoinColumn({ name: "expire1method" })
    expire1method?: Relation<ProcExpireMethod | null>;
}
