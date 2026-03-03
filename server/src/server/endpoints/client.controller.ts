import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';

@ControllerPath('')
export class ClientController extends Controller {
    #path!: string;
    get path(): string {
        if (typeof this.#path !== 'string') {
            this.#path = resolve(
                import.meta.dirname,
                '../../../../client/dist/client/browser'
            );
        }

        return this.#path;
    }

    async resolvePath() {
        const fullPath = resolve(this.path, this.request.path.slice(1));
        try {
            const dirent = await stat(fullPath);
            if (!dirent.isFile()) {
                throw new Error();
            }

            return fullPath;
        } catch {
            return resolve(this.path, 'index.html');
        }
    }

    @Get('*all')
    @Get()
    async getNested(): Promise<void> {
        const fullPath = await this.resolvePath();
        this.response.sendFile(fullPath);
    }
}