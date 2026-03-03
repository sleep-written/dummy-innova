import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { BaseCompanies } from '@entities/base-companies.entity.js';
import { dataSource } from '@/data-source.js';

@ControllerPath('')
export class GetController extends Controller {
    @Get()
    async get(): Promise<void> {
        const odata = new ODataEntity(BaseCompanies, dataSource, this.request);
        const result = await odata.getMany({});
        this.response.json(result);
    }
}