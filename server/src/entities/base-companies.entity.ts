import type { Relation } from 'typeorm';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProcOrders } from './proc-orders.entity.js';

@Entity({ name: 'base_companies' })
export class BaseCompanies extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'company' })
    id!: number;

    @Column({ type: 'bit', default: false })
    active!: boolean;

    /**
     * RUT del cliente, sin puntos, pero con guión.
     */
    @Column({ type: 'nvarchar', length: 30, nullable: false })
    code!: string;

    /**
     * Nombre del cliente.
     */
    @Column({ type: 'nvarchar', length: 30, nullable: false })
    name!: string;

    /**
     * Nombre largo del cliente.
     */
    @Column({ type: 'nvarchar', length: 80, nullable: false })
    description8!: string;

    @OneToMany(_ => ProcOrders, r => r.cliente)
    orders?: Relation<ProcOrders[]>;
}