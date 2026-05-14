import type { DataSourceOptions, EntityMetadata } from 'typeorm';

export type AdvancedDataSourceOptions = DataSourceOptions & {
    readonly prepareEntityMetadata?: (m: EntityMetadata) => unknown;
}