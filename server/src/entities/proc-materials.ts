import { EntitySchema } from 'typeorm';

export interface ProcMaterials {
    material: number;
    code: string;
    name: string;
    active: boolean;
    pkPackaging?: ProcMaterials | null;
    itPackaging?: ProcMaterials | null;
}

export const procMaterialsSchema = new EntitySchema<ProcMaterials>({
    name: 'ProcMaterials',
    columns: {
        material: {
            type: 'int',
            primary: true,
            generated: 'increment'
        },
        code: {
            type: 'nvarchar',
            length: 60,
            nullable: false,
            collation: 'Danish_Norwegian_CI_AS'
        },
        name: {
            type: 'nvarchar',
            length: 60,
            nullable: false,
            collation: 'Danish_Norwegian_CI_AS'
        },
        active: {
            type: 'bit',
            nullable: false
        }
    },
    relations: {
        pkPackaging: {
            type: 'many-to-one',
            target: 'ProcMaterials',
            nullable: true,
            joinColumn: {
                name: 'pkpackaging',
                referencedColumnName: 'material'
            }
        },
        itPackaging: {
            type: 'many-to-one',
            target: 'ProcMaterials',
            nullable: true,
            joinColumn: {
                name: 'itpackaging',
                referencedColumnName: 'material'
            }
        }
    }
});