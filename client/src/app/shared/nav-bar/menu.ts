export interface Menu {
    id: number;
    path: string | null;
    icon: string;
    name: string;
    parent?: Menu | null;
    children?: Menu[] | null;
}