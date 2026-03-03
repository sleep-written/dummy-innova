import { ControllerRouting } from '@bleed-believer/espresso';
import { GetController } from './get.controller.js';

@ControllerRouting({
    path: 'menu',
    controllers: [
        GetController
    ]
})
export class MenuRouting {}