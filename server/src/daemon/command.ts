import type { DaemonCommandInject } from './command.inject.js';
import type { Executable } from '@bleed-believer/commander';

import { readdir, readFile } from 'node:fs/promises';
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
            resolve:    inject?.resolve?.bind(inject)   ?? resolve
        };

        this.#orderCSV = new OrderCSV({
            readFile:   this.#injected.readFile,
            dataSource: this.#injected.dataSource
        });

        this.#mechty = new Mechty(1_000);
    }

    async #loop(cwd: string): Promise<void> {
        const files = await this.#injected.readdir(cwd, {
            withFileTypes: true,
            recursive: true,
        });

        console.clear();
        console.log('Files:');
        for (const file of files) {
            if (!file.isFile()) continue;

            const path = this.#injected.resolve(file.parentPath, file.name);
            const data = await this.#orderCSV.load(path);
            console.log(data);
        }

        await new Promise(r => setTimeout(r, 1000));
    }

    async start(): Promise<void> {
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
    }
}