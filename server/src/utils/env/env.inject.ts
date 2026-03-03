export interface EnvInject {
    readFileSync(
        pathOrFileURL: string | URL,
        encoding: 'utf-8'
    ): string;

    process: {
        env: NodeJS.ProcessEnv;
    }
}