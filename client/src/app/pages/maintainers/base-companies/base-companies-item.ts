export interface BaseCompaniesItem {
    id: number;
    active: boolean;

    /**
     * RUT del cliente, sin puntos, pero con guión.
     */
    code: string;

    /**
     * Nombre del cliente.
     */
    name: string;

    /**
     * Nombre largo del cliente.
     */
    description8: string;
}