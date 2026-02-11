import type { MigrationInterface, QueryRunner } from "typeorm";
import { Menu } from '@entities/menu.entity.js';

export class InsertMenuItems1770747685276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = queryRunner.connection.getTreeRepository(Menu);
        const maintainers = await repo.save({
            children: [],
            name: 'Maintainers',
            icon: 'settings',
            path: null,
        });

        await repo.save({
            children: [],
            parent: maintainers,
            name: 'Clients',
            icon: 'group',
            path: 'maintainers/base-companies',
        });

        await repo.save({
            children: [],
            parent: maintainers,
            name: 'Products',
            icon: 'favorite',
            path: 'maintainers/proc-materials',
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const repo = queryRunner.connection.getTreeRepository(Menu);
        repo.deleteAll();
    }
}
