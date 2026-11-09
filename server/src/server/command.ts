import type { CommandTarget } from '@bleed-believer/commander';
import type { Application } from 'express';

import { apiRouter } from './api/router.ts';
import { Command } from '@bleed-believer/commander';
import express from 'express';
import { styleText } from 'node:util';

export const serverCommand = new Command({
    description: `Initialize the web server.`,
    positionals: 'server',
    flags: {
        port: {
            description: 'Port which the web server is listening. Default port is 8080',
            short: 'p',
            type: 'number',
        }
    },
    callback: ctx => new class implements CommandTarget {
        #port = ctx.flags.port ?? 8080;

        #listen(app: Application): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                const server = app.listen(this.#port, () => {
                    console.info(`Web server is listening at port ${styleText('blueBright', this.#port.toString())}`);

                    const onAbort = () => {
                        if (server.listening) {
                            console.info(`Closing all web server connections...`);
                            server.closeAllConnections();
                            server.close();
                        }
                    };

                    const onClose = () => {
                        dispose();
                        resolve();
                    };

                    const onError = (e: Error) => {
                        dispose();
                        reject(e);
                    };

                    const dispose = () => {
                        server.off('close', onClose);
                        server.off('error', onError);
                        process.off('SIGINT', onAbort);
                        process.off('SIGTERM', onAbort);
                    };
                
                    server.once('close', onClose);
                    server.once('error', onError);
                    process.on('SIGINT', onAbort);
                    process.on('SIGTERM', onAbort);
                });
            });
        }

        async onInit(): Promise<void> {
            const app = express();
            app.use(apiRouter);

            await this.#listen(app);
        }
    }
})