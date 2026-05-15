import type { DaemonCommandInject } from './command.inject.js';
import type { Executable } from '@bleed-believer/commander';

import { glob, readdir, readFile, rm } from 'node:fs/promises';
import { Command } from '@bleed-believer/commander';
import { resolve } from 'node:path';

import { ormInnovaDataSource } from '@orm-innova/data-source.js';
import { OrderCSV } from './order-csv.js';
import { Mechty } from '@utils/mechty';
import { Env } from '@utils/env';

@Command({
    name: 'daemon',
    path: 'daemon'
})
export class DaemonCommand implements Executable {
    #injected: Required<DaemonCommandInject>;
    #orderCSV: OrderCSV;
    #mechty: Mechty;

    constructor(inject?: DaemonCommandInject) {
        this.#injected = {
            createAbortController:  inject?.createAbortController   ?? (() => new AbortController()),
            dataSource:             inject?.dataSource              ?? ormInnovaDataSource,
            env:                    inject?.env                     ?? new Env('.env'),

            readFile:   inject?.readFile?.bind(inject)  ?? readFile,
            readdir:    inject?.readdir?.bind(inject)   ?? readdir,
            resolve:    inject?.resolve?.bind(inject)   ?? resolve,
            glob:       inject?.glob?.bind(inject)      ?? glob,
            rm:         inject?.rm?.bind(inject)        ?? rm,
        };

        this.#orderCSV = new OrderCSV();
        this.#mechty = new Mechty(1_000);
    }

    async #loop(cwd: string): Promise<void> {
        const files = this.#injected.glob('./*.con', {
            cwd,
            withFileTypes: true
        });

        for await (const file of files) {
            if (!file.isFile()) continue;

            try {
                console.info(`Reading "${file.name}"...`);
                const path = this.#injected.resolve(file.parentPath, file.name);
                const text = await this.#injected.readFile(path, 'utf-16le');
                await this.#injected.rm(path, { force: true });

                const manager = this.#injected.dataSource.manager;
                const data = await this.#orderCSV.parse(text, manager);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        }
    }

    async start(): Promise<void> {
        await this.#injected.dataSource.initialize();
        const cwd = this.#injected.env.get(
            'DUMMY_INNOVA_DAEMON_FOLDER',
            v => this.#injected.resolve(v)
        );

        const controller = this.#injected.createAbortController();
        process.on('SIGINT', () => {
            !controller.signal.aborted &&
            controller.abort();
        });

        while (!controller.signal.aborted) {
            await this.#mechty.execute(() => this.#loop(cwd));
        }

        await this.#injected.dataSource.destroy();
    }
}