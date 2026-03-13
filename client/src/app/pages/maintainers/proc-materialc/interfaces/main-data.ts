import { GridView } from '@bleed-believer/kendo-grid-client';
import { ProcMaterialsItem } from './proc-materials-item';
import { BaseCompaniesItem } from './base-companies-item';

export interface MainData {
    material: ProcMaterialsItem;
    customers: GridView<BaseCompaniesItem>;
}