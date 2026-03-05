import { Controller, Get } from '@bleed-believer/espresso';
import { EndpointError } from '@server/endpoint-error.js';
import { basename } from 'node:path';

export class SystemtypeController extends Controller {
    get language(): string {
        const v = Array.isArray(this.request.params.language)
        ?   this.request.params.language[0]
        :   this.request.params.language ?? 'en';

        return basename(v);
    }

    @Get(':language')
    @Get()
    async get(): Promise<void> {
        const host = this.request.protocol + '://' + this.request.host;
        const lang = this.language;
        const resp = await fetch(`${host}/api/locale/${lang}/Marel.Mp5.Process.dll.xlat.xml`);
        if (!resp.ok) {
            throw new EndpointError(resp.status, await resp.text());
        }

        const json = await resp.json();
        this.response.json(
            json.resources.industry
                .map((x: any) => x.type)
                .flat()
                .find((x: any) => x.$.name === 'Marel.Mp5.Process.Materials.SystemType')
                ?.resource
                ?.map((x: any, i: number) => ({
                    name: x.$.name,
                    text: x.object[0],
                    value: i + 1
                }))
        );
    }
}