import type { MigrationInterface, QueryRunner } from "typeorm";
import { Menu } from '@entities/menu.entity.js';

export class InsertMenuItems1770997972295 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = queryRunner.manager.getTreeRepository(Menu);
        const maintainers = await repo.save({
            parent: null,
            name: 'Maintainers',
            icon: 'settings',
            path: null,
        });

        await repo.save({
            parent: maintainers,
            name: 'Companies',
            icon: 'group',
            path: 'maintainers/base-companies',
        });

        await repo.save({
            parent: maintainers,
            name: 'Layouts',
            icon: 'beenhere',
            path: 'maintainers/proc-layouts',
        });

        await repo.save({
            parent: maintainers,
            name: 'Materials',
            icon: 'favorite',
            path: 'maintainers/proc-materials',
        });

        await repo.save({
            parent: maintainers,
            name: 'Material Types',
            icon: 'category',
            path: 'maintainers/proc-materialtypes',
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const repo = queryRunner.manager.getTreeRepository(Menu);
        await repo.deleteAll();
    }
}
