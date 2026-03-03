import { GridView, GridViewRequest, OData } from '@bleed-believer/kendo-grid-client';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ProcLayoutsItem } from './proc-layouts-item.js';

@Injectable({
  providedIn: 'root',
})
export class Service {
  #httpClient = inject(HttpClient);

  get(options?: GridViewRequest): Promise<GridView<ProcLayoutsItem>> {
    const qst = options
    ? new OData(options).stringify(true)
    : '';

    const obs = this.#httpClient.get<GridView<ProcLayoutsItem>>(`api/proc-layouts${qst}`);
    return firstValueFrom(obs);
  }

  set(item: Omit<ProcLayoutsItem, 'id'> & { id?: number; }): Promise<void> {
    const url = typeof item.id === 'number'
    ? `api/proc-layouts/${item.id}`
    : `api/proc-layouts`;

    const obs = this.#httpClient.post<void>(url, {
      active: item.active,
      code: item.code,
      name: item.name,
    });

    return firstValueFrom(obs);
  }

  delete(id: number): Promise<void> {
    const obs = this.#httpClient.delete<void>(`api/proc-layouts/${id}`);
    return firstValueFrom(obs);
  }
}
