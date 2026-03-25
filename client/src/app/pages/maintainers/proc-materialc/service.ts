import { GridView, GridViewRequest, OData } from '@bleed-believer/kendo-grid-client';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MainData, ProcExpireMethodItem, ProcLayoutsItem, ProcMaterialsItem } from './interfaces';

@Injectable({
    providedIn: 'root',
})
export class Service {
    #httpClient = inject(HttpClient);

    get(materialId: number, options?: GridViewRequest): Promise<MainData> {
        const str = options
        ?   new OData(options).stringify(true)
        :   '';

        const obs = this.#httpClient.get<MainData>(`api/proc-materialc/${materialId}${str}`);
        return firstValueFrom(obs);
    }

    getExpireMethods(): Promise<ProcExpireMethodItem[]> {
        const obs = this.#httpClient.get<ProcExpireMethodItem[]>(`api/proc-expiremethods`);
        return firstValueFrom(obs);
    }

    getPackagings(): Promise<ProcMaterialsItem[]> {
        const obs = this.#httpClient.get<ProcMaterialsItem[]>(`api/proc-materials/packagings`);
        return firstValueFrom(obs);
    }

    getLayouts(): Promise<ProcLayoutsItem[]> {
        const obs = this.#httpClient.get<GridView<ProcLayoutsItem>>(`api/proc-layouts`);
        return firstValueFrom(obs).then(x => x.data);
    }
}
