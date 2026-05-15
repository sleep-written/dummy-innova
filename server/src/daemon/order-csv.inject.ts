import type { DataSource } from 'typeorm';

export interface OrderCSVInject {
    dataSource: DataSource;
}