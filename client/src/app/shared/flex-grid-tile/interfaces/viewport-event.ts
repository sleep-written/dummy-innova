import { Breakpoints } from '@angular/cdk/layout';

export interface ViewportEvent {
    matches: boolean;
    breakpoints: {
        [key in keyof typeof Breakpoints]?: boolean;
    };
}
