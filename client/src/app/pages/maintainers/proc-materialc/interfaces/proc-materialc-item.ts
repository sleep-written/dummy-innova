import { ProcExpireMethodItem } from './proc-expire-method-item';
import { ProcLayoutsItem } from './proc-layouts-item';
import { ProcMaterialsItem } from './proc-materials-item';

export interface ProcMaterialcItem {
    id: number;
    active: boolean;
    description1?: string | null;
    expire1?: number | null;
    packsizeum?: number;
    stacksizeum?: number;
    palletpsizeum?: number;
    palletssizeum?: number;
    packaging?: ProcMaterialsItem | null;
    pkPackaging?: ProcMaterialsItem | null;
    itPackaging?: ProcMaterialsItem | null;
    procLayoutIT?: ProcLayoutsItem | null;
    procLayoutPK?: ProcLayoutsItem | null;
    expire1method?: ProcExpireMethodItem | null;
}
