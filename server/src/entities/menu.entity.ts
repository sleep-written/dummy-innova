import type { Relation } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

@Tree('materialized-path')
@Entity({ name: 'Menu' })
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'varchar', length: 1024, nullable: true })
    path!: string | null;

    @Column({ type: 'varchar', length: 128 })
    icon!: string;

    @Column({ type: 'varchar', length: 512 })
    name!: string;
    
    @TreeChildren()
    children?: Relation<Menu[]> | null;

    @TreeParent()
    parent?: Relation<Menu> | null;
}