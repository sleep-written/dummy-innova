export interface ProcMaterialcItem {
    id: number;
    active: boolean;
    description1?: string | null;
    expire1?: number | null;
    packsizeum: number;
    stacksizeum: number;
    palletpsizeum: number;
    palletssizeum: number;
    customer?: { code: string; name: string } | null;
    packaging?: { code: string; name: string } | null;
    pkPackaging?: { code: string; name: string } | null;
    itPackaging?: { code: string; name: string } | null;
    procLayoutPK?: { code: string; name: string } | null;
    procLayoutIT?: { code: string; name: string } | null;
    expire1method?: { code: string; name: string } | null;
}
