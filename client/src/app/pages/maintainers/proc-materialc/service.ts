import { GridView, GridViewRequest, OData } from '@bleed-believer/kendo-grid-client';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ProcMaterialcItem } from './interfaces';
import { ProcMaterialsItem } from '../proc-materials/interfaces';

@Injectable({
    providedIn: 'root',
})
export class Service {
    #httpClient = inject(HttpClient);

    getSettings(materialId: number, options?: GridViewRequest): Promise<GridView<ProcMaterialcItem>> {
        const qst = options
        ? new OData(options).stringify(true)
        : '';

        const obs = this.#httpClient.get<GridView<ProcMaterialcItem>>(`api/proc-materialc/${materialId}/settings${qst}`);
        return firstValueFrom(obs);
    }

    get(materialId: number): Promise<ProcMaterialsItem> {
        const obs = this.#httpClient.get<ProcMaterialsItem>(`api/proc-materialc/${materialId}`);
        return firstValueFrom(obs);
    }
}
