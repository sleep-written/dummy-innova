import { ProcMaterialcItem } from './proc-materialc-item';

export interface BaseCompaniesItem {
    id: number;
    active: boolean;
    code: string;
    name: string;
    description8: string;
    materialc?: ProcMaterialcItem[] | null;
}