import { GridViewRequest, OData } from '@bleed-believer/kendo-grid-client';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MainData } from './interfaces';

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
}
