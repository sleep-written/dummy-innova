import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { ProcLayouts } from '@entities/proc-layouts.entity.js';
import { dataSource } from '@/data-source.js';

@ControllerPath('')
export class GetController extends Controller {
    @Get()
    async get(): Promise<void> {
        const odata = new ODataEntity(ProcLayouts, dataSource, this.request);
        const result = await odata.getMany({});
        this.response.json(result);
    }
}
