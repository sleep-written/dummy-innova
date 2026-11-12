import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject, Service } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { filter, skip } from 'rxjs';

import type { Menu } from './menu';

@Service()
export class SidenavService {
    readonly #resource = httpResource<Menu[]>(
        () => '/api/menu',
        { defaultValue: [] }
    );

    readonly error = this.#resource.error;
    readonly menus = this.#resource.value;
    readonly isLoading = this.#resource.isLoading;

    constructor() {
        inject(Router).events
            .pipe(filter(x => x instanceof NavigationEnd))
            .pipe(skip(1))
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.#resource.reload());
    }
}
