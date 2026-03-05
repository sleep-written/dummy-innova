import { GridView, GridViewRequest, OData } from '@bleed-believer/kendo-grid-client';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ProcMaterialsItem, SystemtypeItem, ProcMaterialtypesItem } from './interfaces';

@Injectable({
    providedIn: 'root',
})
export class Service {
    #httpClient = inject(HttpClient);

    get(options?: GridViewRequest): Promise<GridView<ProcMaterialsItem>> {
        const qst = options
        ? new OData(options).stringify(true)
        : '';

        const obs = this.#httpClient.get<GridView<ProcMaterialsItem>>(`api/proc-materials${qst}`);
        return firstValueFrom(obs);
    }

    getSystemtype(language?: string): Promise<SystemtypeItem[]> {
        const url = typeof language === 'string'
        ?   `api/systemtype/${language}`
        :   `api/systemtype`;

        const obs = this.#httpClient.get<SystemtypeItem[]>(url);
        return firstValueFrom(obs);
    }

    async getMaterialtype(): Promise<ProcMaterialtypesItem[]> {
        const obs = this.#httpClient.get<GridView<ProcMaterialtypesItem>>('api/proc-materialtypes');
        const res = await firstValueFrom(obs);
        return res.data;
    }

    set(value: {
        id: number | null;
        code: string;
        name: string;
        active: boolean;
        systemtype: number | null;
        pkPackagingId: number | null;
        itPackagingId: number | null;
        materialtypeId: number | null;
    }): Promise<void> {
        const url = typeof value.id === 'number'
        ?   `api/proc-materials/${value.id}`
        :   `api/proc-materials`;

        const obs = this.#httpClient.post<void>(url, value);
        return firstValueFrom(obs);
    }

    delete(id: number): Promise<void> {
        const obs = this.#httpClient.delete<void>(`api/proc-materials/${id}`);
        return firstValueFrom(obs);
    }
}
