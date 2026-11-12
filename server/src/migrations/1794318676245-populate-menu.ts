import type { MigrationInterface, QueryRunner, EntityManager } from 'typeorm';
import type { UserType } from '#entities/user-type.ts';
import type { Menu } from '#entities/menu.ts';

import { menuPermissionSchema } from '#entities/menu-permission.ts';
import { userTypeSchema } from '#entities/user-type.ts';
import { userSchema } from '#entities/user.ts';
import { menuSchema } from '#entities/menu.ts';

interface MenuObject extends Omit<Menu, 'id' | 'children' | 'permissions'> {
    children?: MenuObject[];
    userTypes: UserType[];
}

export class PopulateMenu1794318676245 implements MigrationInterface {
    name = 'PopulateMenu1794318676245';

    public async up({ manager }: QueryRunner): Promise<void> {
        const systemType = await this.#createUserType(manager, {
            code: 'SYSTEM',
            guest: false,
            description: 'User with unlimited access',
            createProcMaterials: true,
            updateProcMaterials: true,
            deleteProcMaterials: true,
        });

        const guestType = await this.#createUserType(manager, {
            code: 'GUEST',
            guest: true,
            description: 'Not logged users',
        });

        await this.#createMenu(manager, {
            path: null,
            icon: 'handyman',
            text: 'Maintainers',
            userTypes: [ systemType ],
            children: [
                {
                    path: '/proc-materials',
                    icon: 'package_2',
                    text: 'Materials',
                    userTypes: [ systemType ]
                }
            ]
        });

        await this.#createMenu(manager, {
            path: '/login',
            icon: 'login',
            text: 'Login',
            userTypes: [ guestType ]
        });

        await this.#createMenu(manager, {
            path: '/logout',
            icon: 'logout',
            text: 'Logout',
            userTypes: [ systemType ]
        });
    }

    public async down({ manager }: QueryRunner): Promise<void> {
        await manager.deleteAll(menuPermissionSchema);
        await manager.deleteAll(userSchema);
        await manager.deleteAll(userTypeSchema);
        await manager.deleteAll(menuSchema);
    }

    async #createUserType(manager: EntityManager, v: Partial<UserType>): Promise<UserType> {
        return manager.save(userTypeSchema, manager.create(userTypeSchema, v));
    }

    async #createMenu(manager: EntityManager, v: MenuObject): Promise<Menu> {
        const menu = await manager.save(menuSchema, 
            manager.create(menuSchema, {
                path: v.path,
                icon: v.icon,
                text: v.text,
                parent: v.parent
            })
        );

        if (v.children) {
            menu.children = [];
            for (const childItem of v.children ?? []) {
                const child = await this.#createMenu(manager, {
                    ...childItem,
                    parent: menu
                });

                menu.children.push(child);
            }
        }

        menu.permissions = [];
        for (const userType of v.userTypes) {
            const permission = await manager.save(menuPermissionSchema,
                manager.create(menuPermissionSchema, { menu, userType })
            );

            menu.permissions.push(permission);
        }

        return menu;
    }
}
