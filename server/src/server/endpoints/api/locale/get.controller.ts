import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { basename, join, resolve } from 'node:path';
import { parseStringPromise } from 'xml2js';
import { readdir, readFile } from 'node:fs/promises';

import { EndpointError } from '@server/endpoint-error.js';

@ControllerPath('')
export class GetController extends Controller {
    #location = resolve(
        import.meta.dirname,
        '../../../../../../locale'
    );

    get language(): string {
        const v = Array.isArray(this.request.params.language)
        ?   this.request.params.language[0]
        :   this.request.params.language;

        return basename(v);
    }

    get filename(): string {
        const v = Array.isArray(this.request.params.filename)
        ?   this.request.params.filename[0]
        :   this.request.params.filename;

        return basename(v);
    }
    
    @Get(':language/:filename')
    async getLocaleDetails(): Promise<void> {
        const path = join(this.#location, this.language, this.filename);
        const text = await readFile(path, 'utf-8').catch(cause => {
            throw new EndpointError(
                404,
                `File "${this.filename}" for language "${this.language}" not found`,
                { cause }
            );
        });

        const data = await parseStringPromise(text);
        this.response.json(data);
    }

    @Get(':language')
    async getLocale(): Promise<void> {
        const resp: string[] = [];
        const path = join(this.#location, this.language);
        const data = await readdir(path, { recursive: false, withFileTypes: true })
            .catch(cause => { throw new EndpointError(404, 'Language not found', { cause }) });

        for (const item of data) {
            if (item.isFile()) {
                resp.push(item.name);
            }
        }

        this.response.json(resp);
    }

    @Get()
    async get(): Promise<void> {
        const resp: string[] = [];
        const data = await readdir(this.#location, { recursive: false, withFileTypes: true })
            .catch(cause => { throw new EndpointError(404, 'Locale folder not found', { cause }) });

        for (const item of data) {
            if (item.isDirectory()) {
                resp.push(item.name);
            }
        }

        this.response.json(resp);
    }
}