import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface SystemUser {
    username: string;
    password: string;
}

@Service()
export class LoginService {
    readonly #http = inject(HttpClient);

    readonly systemStatus = httpResource<{ exists: boolean; }>(
        () => '/api/system',
        { defaultValue: { exists: false } }
    );

    createSystemUser(username: string, password: string): Promise<void> {
        const obs = this.#http.put<void>('/api/system', { username, password });
        return firstValueFrom(obs);
    }

    login(username: string, password: string): Promise<void> {
        const obs = this.#http.post<void>('/api/login', { username, password });
        return firstValueFrom(obs);
    }
}
