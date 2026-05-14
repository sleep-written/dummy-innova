import type { AdvancedDataSourceOptions } from './advanced-data-source.options.js';

import { DataSource, InstanceChecker } from 'typeorm';
import { ConnectionMetadataBuilder } from 'typeorm/connection/ConnectionMetadataBuilder.js';
import { EntityMetadataValidator } from 'typeorm/metadata-builder/EntityMetadataValidator.js';
import { ObjectUtils } from 'typeorm/util/ObjectUtils.js';

export class AdvancedDataSource extends DataSource {
    declare options: AdvancedDataSourceOptions;

    // For override default options constructor type
    constructor(options: AdvancedDataSourceOptions) {
        super(options);
    }

    protected override async buildMetadatas(): Promise<void> {
        const connectionMetadataBuilder = new ConnectionMetadataBuilder(this);
        const entityMetadataValidator = new EntityMetadataValidator();

        // Create subscribers instances if they are not disallowed from high-level (for example they can disallowed from migrations run process)
        const flattenedSubscribers = ObjectUtils.mixedListToArray(this.options.subscribers || []);
        const subscribers = await connectionMetadataBuilder.buildSubscribers(flattenedSubscribers);
        ObjectUtils.assign(this, { subscribers: subscribers });

        // Build entity metadatas
        const flattenedEntities = ObjectUtils.mixedListToArray(this.options.entities || []);
        const entityMetadatas = await connectionMetadataBuilder.buildEntityMetadatas(flattenedEntities);
        if (this.options.prepareEntityMetadata) {
            for (const m of entityMetadatas) {
                try {
                    await this.options.prepareEntityMetadata(m);
                } catch (cause) {
                    throw new Error(`The data source hook "prepareEntityMetadata" has been crashed`, { cause });
                }
            }
        }

        // Assign metadata
        ObjectUtils.assign(this, {
            entityMetadatas: entityMetadatas,
            entityMetadatasMap: new Map(entityMetadatas.map((metadata) => [metadata.target, metadata])),
        });

        // Create migration instances
        const flattenedMigrations = ObjectUtils.mixedListToArray(this.options.migrations || []);
        const migrations = await connectionMetadataBuilder.buildMigrations(flattenedMigrations);
        ObjectUtils.assign(this, { migrations: migrations });

        // Validate all created entity metadatas to make sure user created entities are valid and correct
        entityMetadataValidator.validateMany(
            this.entityMetadatas.filter((metadata) => metadata.tableType !== "view"),
            this.driver
        );

        // Set current data source to the entities
        for (const entityMetadata of entityMetadatas) {
            if (InstanceChecker.isBaseEntityConstructor(entityMetadata.target)) {
                entityMetadata.target.useDataSource(this);
            }
        }
    }
}