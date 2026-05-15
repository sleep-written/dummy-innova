export interface ProcOrdersItem {
    id: number;
    code: string;
    name: string;
    shmark: string | null;
    shname: string;
    extcode?: string | null;
    active: boolean;
    orderstatus: number;
    begTime?: string | null;
    endTime?: string | null;
    cliente?: {
        id: number;
        code: string;
        name: string;
    } | null;
}
