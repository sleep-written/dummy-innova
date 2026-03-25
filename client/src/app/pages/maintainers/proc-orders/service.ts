import { GridView, GridViewRequest, OData } from '@bleed-believer/kendo-grid-client';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ProcOrdersItem } from './interfaces';

@Injectable({
    providedIn: 'root',
})
export class Service {
    #httpClient = inject(HttpClient);

    get(options?: GridViewRequest): Promise<GridView<ProcOrdersItem>> {
        const qst = options
        ? new OData(options).stringify(true)
        : '';

        const obs = this.#httpClient.get<GridView<ProcOrdersItem>>(`api/proc-orders${qst}`);
        return firstValueFrom(obs);
    }
}
