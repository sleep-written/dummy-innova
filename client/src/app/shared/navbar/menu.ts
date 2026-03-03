export interface Menu {
    id: number;
    icon: string;
    name: string;
    path: string | null;
    children?: Menu[] | null;
}