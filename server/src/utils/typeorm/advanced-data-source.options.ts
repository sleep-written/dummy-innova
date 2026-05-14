import type { DataSourceOptions, EntityMetadata } from 'typeorm';

export type AdvancedDataSourceOptions = DataSourceOptions & {
    prepareEntityMetadata?(m: EntityMetadata): unknown;
}