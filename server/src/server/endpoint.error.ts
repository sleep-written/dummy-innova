export class EndpointError extends Error {
    #code: number;
    get code(): number {
        return this.#code;
    }

    constructor(code: number, message: string) {
        super(message);
        this.#code = code;
        this.name = 'EndpointError';
    }
}