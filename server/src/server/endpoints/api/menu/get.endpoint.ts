import type { FindOptionsWhere } from 'typeorm';
import type { Menu } from '#entities/menu.ts';

import { userTypeSchema } from '#entities/user-type.ts';
import { menuSchema } from '#entities/menu.ts';
import { dataSource } from '#data-source.ts';
import { IsNull } from 'typeorm';
import { Router } from 'express';

const getMenus = async (where: FindOptionsWhere<Menu>): Promise<Menu[]> => {
    const menus = await dataSource.manager.findBy(menuSchema, {
        ...where
    });

    for (const item of menus) {
        item.children = await getMenus({
            ...where,
            parent: { id: item.id }
        });
    }

    return menus;
}

export const getEndpoint = Router().get('/', async (req, res) => {
    const userType = await dataSource.manager.findOneByOrFail(
        userTypeSchema,
        typeof req.session.userId === 'number'
        ?   { users: { id: req.session.userId } }
        :   { guest: true }
    );

    const menus = await getMenus({
        parent: { id: IsNull() },
        permissions: {
            userType: {
                id: userType.id
            }
        }
    });

    res.json(menus);
});