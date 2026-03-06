import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'proc_materialtypes' })
export class ProcMaterialtypes extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'materialtype' })
    id!: number;
    
    @Column({ type: 'nvarchar', length: 30 })
    code!: string;

    @Column({ type: 'nvarchar', length: 30 })
    name!: string;

    @Column({ type: 'nvarchar', length: 10 })
    shname!: string;
}