import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { dataSource } from '@/data-source.js';
import { Menu } from '@entities/menu.entity.js';

@ControllerPath('')
export class GetController extends Controller {
    @Get()
    async get(): Promise<void> {
        const tree = await dataSource
            .getTreeRepository(Menu)
            .findTrees();

        this.response.json(tree);
    }
}