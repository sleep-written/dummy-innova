export interface Menu {
    path: string | null;
    icon: string;
    text: string;
    children: Menu[];
}