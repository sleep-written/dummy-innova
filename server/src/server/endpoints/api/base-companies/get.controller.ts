import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { BaseCompanies } from '@/orm-innova/entities/base-companies.entity.js';
import { ormInnovaDataSource } from '@/orm-innova/data-source.js';

@ControllerPath('')
export class GetController extends Controller {
    @Get()
    async get(): Promise<void> {
        const odata = new ODataEntity(BaseCompanies, ormInnovaDataSource, this.request);
        const result = await odata.getMany({});
        this.response.json(result);
    }
}