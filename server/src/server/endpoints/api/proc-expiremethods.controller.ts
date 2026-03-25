import { Controller, Get } from '@bleed-believer/espresso';
import { ProcExpireMethod } from '@/orm-innova/entities/proc-expire-method.entity.js';

export class ProcExpiremethodsController extends Controller {
    @Get()
    async get(): Promise<void> {
        const data = await ProcExpireMethod.findBy({ active: true });
        this.response.json(data);
    }
}