import type { Relation } from 'typeorm';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProcOrders } from './proc-orders.entity.js';
import { ProcMaterialc } from './proc-materialc.entity.js';

@Entity({ name: 'base_companies' })
export class BaseCompanies extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'company' })
    id!: number;

    @Column({ type: 'bit', default: false })
    active!: boolean;

    /**
     * RUT del cliente, sin puntos, pero con guión.
     */
    @Column({ type: 'nvarchar', length: 30 })
    code!: string;

    /**
     * Nombre del cliente.
     */
    @Column({ type: 'nvarchar', length: 30 })
    name!: string;

    /**
     * Nombre largo del cliente.
     */
    @Column({ type: 'nvarchar', length: 80, nullable: true })
    description8!: string;

    @OneToMany(_ => ProcOrders, r => r.customer)
    orders?: Relation<ProcOrders[]> | null;

    @OneToMany(_ => ProcMaterialc, r => r.customer)
    materialc?: Relation<ProcMaterialc[]> | null;
}