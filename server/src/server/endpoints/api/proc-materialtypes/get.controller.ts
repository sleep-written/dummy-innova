import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { ormInnovaDataSource } from '@orm-innova/data-source.js';
import { ProcMaterialtypes } from '@orm-innova/entities/proc-materialtypes.entity.js';

@ControllerPath('')
export class GetController extends Controller {
    @Get()
    async get(): Promise<void> {
        const odata = new ODataEntity(ProcMaterialtypes, ormInnovaDataSource, this.request);
        const data = await odata.getMany({});
        this.response.json(data);
    }
}