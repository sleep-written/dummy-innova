export class EndpointError extends Error {
    #status: number;
    get status(): number {
        return this.#status;
    }

    constructor(status: number, message: string, options?: ErrorOptions) {
        super(message, options);
        this.#status = status;
    }
}