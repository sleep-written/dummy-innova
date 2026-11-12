import type { MenuPermission } from './menu-permission.ts';

import { EntitySchema } from 'typeorm';

export interface Menu {
    id: number;
    path: string | null;
    icon: string;
    text: string;

    parent?: Menu | null;
    children?: Menu[];
    permissions?: MenuPermission[];
}

export const menuSchema = new EntitySchema<Menu>({
    name: 'Menu',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'increment'
        },
        path: {
            type: 'varchar',
            length: 128,
            nullable: true
        },
        icon: {
            type: 'varchar',
            length: 64,
            nullable: false
        },
        text: {
            type: 'nvarchar',
            length: 128,
            nullable: false
        }
    },
    relations: {
        parent: {
            type: 'many-to-one',
            target: 'Menu',
            inverseSide: 'children',
            nullable: true,
            treeParent: true,
            joinColumn: {
                name: 'parentId',
                referencedColumnName: 'id'
            }
        },
        children: {
            type: 'one-to-many',
            target: 'Menu',
            inverseSide: 'parent',
            treeChildren: true
        },
        permissions: {
            type: 'one-to-many',
            target: 'MenuPermission',
            inverseSide: 'menu'
        }
    }
});