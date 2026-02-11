import type { Request, Response } from 'express';
import type { Executable, Argv } from '@bleed-believer/commander';

import { Command, GetArgv } from '@bleed-believer/commander';
import { Espresso } from '@bleed-believer/espresso';
import { resolve } from 'node:path';
import express from 'express';

import { EndpointsRouting } from './endpoints/routing.js';
import { dataSource } from '@/data-source.js';

@Command({
    name: 'start',
    path: 'start'
})
export class StartCommand implements Executable {
    @GetArgv()
    declare argv: Argv;

    #port!: number;
    get port(): number {
        if (typeof this.#port !== 'number') {
            const port = parseInt(this.argv.flags['--port']?.[0]);
            this.#port = isNaN(port)
            ?   8080
            :   port;
        }

        return this.#port;
    }

    get client(): string {
        return resolve(
            import.meta.dirname,
            '../../../client/dist/client/browser'
        );
    }

    onError(err: Error, _: Request, res: Response): void {
        res.statusCode = 500;
        res.type('plain');
        res.end(err.message);
    }

    async start(): Promise<void> {
        const app = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json({ strict: true }));

        const esp = new Espresso(app, { lowercase: true, verbose: true });
        esp.onError(this.onError.bind(this));
        esp.inject(EndpointsRouting);

        await dataSource.initialize();
        await new Promise<void>((resolve, reject) => {
            try {
                const server = app.listen(this.port, () => {
                    console.log(`@dummy-innova/server is ready at port ${this.port}`);
                    process.once('SIGINT', () => server.close());
                });

                server.once('close', () => resolve());
            } catch (err) {
                reject(err);
            }
        });
        
        await dataSource.destroy();
    }
}