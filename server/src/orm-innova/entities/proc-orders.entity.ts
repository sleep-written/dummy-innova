import type { Relation } from 'typeorm';

import { BaseEntity, Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { ProcOrdersStatus } from './proc-orders-status.js';
import { ProcCollections } from './proc-collections.entity.js';
import { BaseCompanies } from './base-companies.entity.js';
import { ProcOrderL } from './proc-orderl.entity.js';
import { ProcItems } from './proc-items.entity.js';

@Entity({ name: 'proc_orders' })
export class ProcOrders extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'order' })
    id!: number;

    /**
     * Nombre del contrato.
     */
    @Column({ type: 'nvarchar', length: 30 })
    name!: string;

    /**
     * El correlativo del contrato en ANZIO.
     */
    @Column({ type: 'nvarchar', length: 30 })
    code!: string;

    /**
     * Nombre del contrato.
     */
    @Column({ type: 'nvarchar', length: 10 })
    shname!: string;

    /**
     * PO Buyer.
     */
    @Column({ type: 'nvarchar', length: 30, nullable: true })
    extcode?: string | null;

    /**
     * Campo en donde se debe guardar el valor máximo por animal para el contrato.
     */
    @Column({ type: 'int', nullable: true })
    dimension1?: number | null;

    /**
     * Fecha inicio de producción.
     */
    @Column({ name: 'begtime', type: 'datetime', nullable: true })
    begTime?: Date | null;

    /**
     * Fecha fin de producción.
     */
    @Column({ name: 'endtime', type: 'datetime', nullable: true })
    endTime?: Date | null;

    /**
     * El flag que indica si el contrato está activo o no
     */
    @Column({ type: 'bit' })
    active!: boolean;

    @Column({ name: 'description1', type: 'nvarchar', length: 80, nullable: true })
    countryISO?: string | null;

    @Column({ name: 'description2', type: 'nvarchar', length: 80, nullable: true })
    shMark?: string | null;

    /**
     * Fecha de creación.
     */
    @Column('datetime')
    created!: Date;

    /**
     * Fecha de última modificación.
     */
    @Column('datetime')
    modified!: Date;

    /**
     * Estado del contrato.
     */
    @Column('tinyint')
    orderstatus!: ProcOrdersStatus;

    @Column({ type: 'tinyint' })
    transferstatus!: number;

    @Column({ type: 'tinyint' })
    numbermethod!: number;

    @Column({ type: 'tinyint' })
    ordertype!: number;

    @Column({ type: 'tinyint' })
    accepttype!: number;

    @Column({ type: 'smallint' })
    amountum!: number;

    @Column({ type: 'bit' })
    allowadd!: boolean;

    /**
     * Detalle del contrato
     */
    @OneToMany(_ => ProcOrderL, r => r.procOrders)
    procOrderL?: Relation<ProcOrderL[]>  | null;

    @ManyToOne(_ => BaseCompanies, r => r.orders)
    @JoinColumn({ name: 'customer'  })
    customer?: Relation<BaseCompanies> | null;

    @OneToMany(_ => ProcItems, r => r.procOrders)
    procItems?: Relation<ProcItems[]> | null;

    @OneToMany(_ => ProcCollections, r => r.procOrders)
    procCollections?: Relation<ProcCollections[]> | null;
}
