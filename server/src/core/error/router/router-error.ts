import {BaseError} from "../base-error";

export class RouterError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, RouterError.prototype)
    }
}
