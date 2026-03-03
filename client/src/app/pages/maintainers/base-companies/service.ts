import { GridViewRequest, GridView, OData } from '@bleed-believer/kendo-grid-client';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BaseCompaniesItem } from './base-companies-item';

@Injectable({
  providedIn: 'root',
})
export class Service {
  #httpClient = inject(HttpClient);

  get(options?: GridViewRequest): Promise<GridView<BaseCompaniesItem>> {
    const qsr = options
    ? new OData(options).stringify(true)
    : '';

    const obs = this.#httpClient.get<GridView<BaseCompaniesItem>>(`api/base-companies${qsr}`);
    return firstValueFrom(obs);
  }

  set(item: Omit<BaseCompaniesItem, 'id'> & { id?: number; }): Promise<void> {
    const url = typeof item.id === 'number'
    ? `api/base-companies/${item.id}`
    : `api/base-companies`;

    const obs = this.#httpClient.post<void>(url, {
      description8: item.description8,
      active: item.active,
      code: item.code,
      name: item.name,
    });

    return firstValueFrom(obs);
  }

  delete(id: number): Promise<void> {
    const obs = this.#httpClient.delete<void>(`api/base-companies/${id}`);
    return firstValueFrom(obs);
  }
}
