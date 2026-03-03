import { ControllerRouting } from '@bleed-believer/espresso';

import { DeleteController } from './delete.controller.js';
import { GetController } from './get.controller.js';
import { SetController } from './set.controller.js';

@ControllerRouting({
    path: 'base-companies',
    controllers: [
        DeleteController,
        GetController,
        SetController,
    ]
})
export class BaseCompaniesRouting {}