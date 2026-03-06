import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { IsNull } from 'typeorm';

import { dataSource } from '@/data-source.js';
import { Menu } from '@entities/menu.entity.js';

@ControllerPath('')
export class GetController extends Controller {
    #repo = dataSource.getTreeRepository(Menu);

    async #getDescendants(parent: Menu): Promise<Menu[] | undefined> {
        const children = await this.#repo.findBy({ parent, visible: true });
        for (const node of children) {
            node.children = await this.#getDescendants(node);
        }

        return children.length > 0
        ?   children
        :   undefined;
    }

    @Get()
    async get(): Promise<void> {
        const tree = await this.#repo.findBy({
            parent: IsNull(),
            visible: true
        });

        for (const root of tree) {
            root.children = await this.#getDescendants(root);
        }

        this.response.json(tree);
    }
}