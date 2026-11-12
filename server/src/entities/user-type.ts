import type { MenuPermission } from './menu-permission.ts';
import type { User } from './user.ts';

import { EntitySchema } from 'typeorm';

export interface UserType {
    id: number;
    code: string;
    guest: boolean;
    description: string;
    
    users?: User[];
    permissions?: MenuPermission[];

    // Permissions
    createProcMaterials: boolean;
    updateProcMaterials: boolean;
    deleteProcMaterials: boolean;
}

export const userTypeSchema = new EntitySchema<UserType>({
    name: 'UserType',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'increment'
        },
        guest: {
            type: 'bit',
            nullable: false
        },
        code: {
            type: 'varchar',
            length: 32,
            nullable: false
        },
        description: {
            type: 'nvarchar',
            length: 128,
            nullable: false
        },
        createProcMaterials: { type: 'bit', default: false },
        updateProcMaterials: { type: 'bit', default: false },
        deleteProcMaterials: { type: 'bit', default: false },
    },
    relations: {
        users: {
            type: 'one-to-many',
            target: 'User',
            inverseSide: 'userType'
        },
        permissions: {
            type: 'one-to-many',
            target: 'MenuPermission',
            inverseSide: 'userType'
        }
    }
});