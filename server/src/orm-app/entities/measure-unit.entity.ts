import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'MeasureUnit' })
export class MeasureUnit extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'nvarchar', length: 128 })
    description!: string;
}