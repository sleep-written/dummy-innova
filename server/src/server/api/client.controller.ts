import { resolve } from 'node:path';
import { Router } from 'express';
import { stat } from 'node:fs/promises';

const root = resolve(
    import.meta.dirname,
    `../../../..`,
    `client/dist/client/browser`
);

const resolvePath = async (path: string): Promise<string> => {
    try {
        const flatPath = resolve(path).slice(1);
        const fullPath = resolve(root, flatPath);
        const stats = await stat(fullPath);
        if (stats.isFile()) {
            return fullPath;
        } else if (stats.isDirectory()) {
            const innerPath = resolve(fullPath, 'index.html');
            return resolvePath(innerPath);
        }

        throw new Error();

    } catch {
        return resolve(root, 'index.html');
    }
}

export const clientController = Router()
    .get('{/*all}', async (req, res) => {
        const path = await resolvePath(req.path);
        res.sendFile(path);
    });