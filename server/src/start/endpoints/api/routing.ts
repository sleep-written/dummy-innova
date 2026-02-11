import { ControllerRouting } from '@bleed-believer/espresso';

import { BaseCompaniesRouting } from './base-companies/routing.js';
import { MenuRouting } from './menu/routing.js';

@ControllerRouting({
    path: 'api',
    routes: [
        BaseCompaniesRouting,
        MenuRouting,
    ]
})
export class APIRouting {}