import { ProcMaterialtypesItem } from './proc-materialtypes-item';

export interface ProcMaterialsItem {
    id: number;
    code: string;
    name: string;
    active: boolean;
    systemtype: number;
    materialtype?: ProcMaterialtypesItem;
    pkPackaging?: ProcMaterialsItem;
    itPackaging?: ProcMaterialsItem;
}
