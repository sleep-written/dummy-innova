import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { ProcLayouts } from '@/orm-innova/entities/proc-layouts.entity.js';
import { ormInnovaDataSource } from '@/orm-innova/data-source.js';

@ControllerPath('')
export class GetController extends Controller {
    @Get()
    async get(): Promise<void> {
        const odata = new ODataEntity(ProcLayouts, ormInnovaDataSource, this.request);
        const result = await odata.getMany({});
        this.response.json(result);
    }
}
