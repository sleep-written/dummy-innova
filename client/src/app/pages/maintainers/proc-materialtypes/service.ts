import { GridView, GridViewRequest, OData } from '@bleed-believer/kendo-grid-client';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ProcMaterialtypesItem } from './proc-materialtypes-item.js';

@Injectable({
    providedIn: 'root',
})
export class Service {
    #httpClient = inject(HttpClient);

    get(options?: GridViewRequest): Promise<GridView<ProcMaterialtypesItem>> {
        const qst = options
        ? new OData(options).stringify(true)
        : '';

        const obs = this.#httpClient.get<GridView<ProcMaterialtypesItem>>(`api/proc-materialtypes${qst}`);
        return firstValueFrom(obs);
    }

    set(item: Omit<ProcMaterialtypesItem, 'id'> & { id?: number; }): Promise<void> {
        const url = typeof item.id === 'number'
        ? `api/proc-materialtypes/${item.id}`
        : `api/proc-materialtypes`;

        const obs = this.#httpClient.post<void>(url, {
            code: item.code,
            name: item.name,
            shname: item.shname,
        });

        return firstValueFrom(obs);
    }

    delete(id: number): Promise<void> {
        const obs = this.#httpClient.delete<void>(`api/proc-materialtypes/${id}`);
        return firstValueFrom(obs);
    }
}
