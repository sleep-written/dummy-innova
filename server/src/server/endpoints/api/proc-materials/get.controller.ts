import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { ProcMaterials } from '@entities/proc-materials.entity.js';
import { dataSource } from '@/data-source.js';

@ControllerPath('')
export class GetController extends Controller {
    @Get()
    async get(): Promise<void> {
        const odata = new ODataEntity(ProcMaterials, dataSource, this.request);
        const result = await odata.getMany({
            relations: {
                itPackaging: true,
                pkPackaging: true,
                materialtype: true
            }
        });
        this.response.json(result);
    }
}
