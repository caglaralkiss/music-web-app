import {BaseError} from "../../base-error";

export class ParseError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, ParseError.prototype)
    }
}
