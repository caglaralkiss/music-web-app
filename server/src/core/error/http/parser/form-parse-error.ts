import {ParseError} from "./parse-error";

export class FormParseError extends ParseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, FormParseError.prototype)
    }
}
