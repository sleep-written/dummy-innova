import { GridView, GridViewRequest, OData } from '@bleed-believer/kendo-grid-client';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GridResult } from './interfaces';

@Injectable({
    providedIn: 'root',
})
export class Service {
    #httpClient = inject(HttpClient);

    get(orderId: number, options?: GridViewRequest): Promise<GridResult> {
        const qst = options
        ? new OData(options).stringify(true)
        : '';

        const obs = this.#httpClient.get<GridResult>(`api/proc-orderl/${orderId}${qst}`);
        return firstValueFrom(obs);
    }
}
