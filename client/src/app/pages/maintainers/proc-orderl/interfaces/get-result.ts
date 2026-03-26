import { GridView } from '@bleed-believer/kendo-grid-client';
import { ProcOrderlItem } from './proc-orderl-item';
import { ProcOrdersItem } from './proc-orders-item';

export interface GridResult {
    order: ProcOrdersItem;
    details: GridView<ProcOrderlItem>;
}