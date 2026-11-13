import { inject, Service } from '@angular/core';

import type { User } from './user';
import { httpResource } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Service()
export class SessionChipService {
    readonly #userResource = httpResource<User | null>(
        () => '/api/me',
        { defaultValue: null }
    );

    readonly user = this.#userResource.value;

    constructor() {
        inject(Router).events
            .pipe(filter(x => x instanceof NavigationEnd))
            .pipe(skip(1))
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.#userResource.reload());
    }
}
