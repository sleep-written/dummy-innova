export interface ProcOrdersItem {
    id: number;
    code: string;
    name: string;
    shname: string;
    extcode?: string | null;
    active: boolean;
    orderstatus: number;
    begTime?: string | null;
    endTime?: string | null;
    countryISO?: string;
    customer?: {
        id: number;
        code: string;
        name: string;
    } | null;
}
