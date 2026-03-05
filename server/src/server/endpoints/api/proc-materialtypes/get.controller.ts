import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { ProcMaterialtypes } from '@entities/proc-materialtypes.entity.js';
import { dataSource } from '@/data-source.js';

@ControllerPath('')
export class GetController extends Controller {
    @Get()
    async get(): Promise<void> {
        const odata = new ODataEntity(ProcMaterialtypes, dataSource, this.request);
        const data = await odata.getMany({});
        this.response.json(data);
    }
}