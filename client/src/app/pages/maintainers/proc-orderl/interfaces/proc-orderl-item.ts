export interface ProcOrderlItem {
    id: number;
    descript?: string | null;
    olstatus: number;
    maxamount?: number | null;
    curamount?: number | null;
    expire1?: number | null;
    nolimit: boolean;
    useco: boolean;
    procMaterials?: {
        id: number;
        code: string;
        name: string;
    } | null;
    pkPackaging?: {
        id: number;
        code: string;
        name: string;
    } | null;
    itPackaging?: {
        id: number;
        code: string;
        name: string;
    } | null;
    procLayoutIT?: {
        id: number;
        code: string;
        name: string;
    } | null;
    procLayoutPK?: {
        id: number;
        code: string;
        name: string;
    } | null;
    expire1method?: {
        id: number;
        code: string;
        name: string;
    } | null;
}
