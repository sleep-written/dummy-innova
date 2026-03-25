export interface EnvInject {
    readFileSync(
        pathOrFileURL: string | URL,
        encoding: 'utf-8'
    ): string;

    accessSync(
        path: string
    ): void;

    process: {
        env: NodeJS.ProcessEnv;
    }
}