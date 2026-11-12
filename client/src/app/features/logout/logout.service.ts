import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Service()
export class LogoutService {
    #httpClient = inject(HttpClient);

    async logout(): Promise<void> {
        const o = this.#httpClient.delete<void>('/api/logout');
        return firstValueFrom(o);
    }
}
