import type { Menu } from './menu.ts';
import type { UserType } from './user-type.ts';

import { EntitySchema } from 'typeorm';

export interface MenuPermission {
    id: number;
    menu?: Menu;
    userType?: UserType;
}

export const menuPermissionSchema = new EntitySchema<MenuPermission>({
    name: 'MenuPermission',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'increment'
        }
    },
    relations: {
        menu: {
            type: 'many-to-one',
            target: 'Menu',
            inverseSide: 'permissions'
        },
        userType: {
            type: 'many-to-one',
            target: 'UserType',
            inverseSide: 'permissions'
        }
    }
});