import type { Relation } from 'typeorm';

import {
    BaseEntity, Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn, Column, 
} from 'typeorm';
import { ProcOrderLStatus } from './proc-orderl-status.js';
import { ProcMaterials } from './proc-materials.entity.js';
import { ExpireMethod } from './expire-method.entity.js';
import { ProcLayouts } from './proc-layouts.entity.js';
import { ProcOrders } from './proc-orders.entity.js';

@Entity({ name: 'proc_orderl' })
export class ProcOrderL extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    /**
     * Producto glosa.
     */
    @Column({ type: 'nvarchar', length: 80, name: 'description1', nullable: true })
    descript?: string;

    /**
     * Estado de la línea del producto
     */
    @Column({ type: 'smallint' })
    olstatus!: ProcOrderLStatus;

    /**
     * Cantidad máxima del producto a producir
     * (es el valor que se ingresa desde SYS_EXPORT).
     */
    @Column({ type: 'real', nullable: true })
    maxamount!: number;

    /**
     * Cantidad actual de producto producido.
     */
    @Column({ type: 'real', nullable: true })
    curamount!: number;

    /**
     * Vencimiento.
     */
    @Column({ type: 'int', nullable: true })
    expire1?: number | null;

    @Column({ type: 'smallint' })
    assigntype!: number;

    @Column({ type: 'smallint' })
    unittype!: number;

    @Column({ type: 'smallint' })
    amountum!: number;
    
    @Column({ type: 'bit' })
    nolimit!: boolean;
    
    @Column({ type: 'bit' })
    isupdated!: boolean;

    /**
     * Indica si se deben de usar o no las taras y etiquetas definidas
     * en el mantenedor de productos por cliente.
     */
    @Column({ type: 'bit' })
    useco!: boolean;
    
    @Column({ type: 'smallint' })
    packsizeum!: number;
    
    @Column({ type: 'smallint' })
    stacksizeum!: number;
    
    @Column({ type: 'smallint' })
    palletpsizeum!: number;
    
    @Column({ type: 'smallint' })
    palletssizeum!: number;
    
    @Column({ type: 'bit' })
    allowchange!: boolean;
    
    @Column({ type: 'smallint' })
    planstatus!: number;
    
    /**
     * Contrato.
     */
    @ManyToOne(_ => ProcOrders, ref => ref.procOrderL)
    @JoinColumn({ name: 'order' })
    procOrders?: Relation<ProcOrders>;

    /**
     * Producto.
     */
    @ManyToOne(_ => ProcMaterials, ref => ref.procOrderL)
    @JoinColumn({ name: 'material' })
    procMaterials?: Relation<ProcMaterials>;

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

    /**
     * Unidad de medida para el tiempo de expiración.
     */
    @ManyToOne(_ => ExpireMethod, r => r.orderDetails, { nullable: true })
    @JoinColumn({ name: 'expire1method' })
    expire1method?: Relation<ExpireMethod | null>;

    @ManyToOne(_ => ProcMaterials, r => r.procOrderLTaraCaja, { nullable: true })
    @JoinColumn({ name: 'pkpackaging' })
    taraCaja?: Relation<ProcMaterials | null>;

    @ManyToOne(_ => ProcMaterials, r => r.procOrderLTaraBolsa, { nullable: true })
    @JoinColumn({ name: 'itpackaging' })
    taraBolsa?: Relation<ProcMaterials | null>;
}