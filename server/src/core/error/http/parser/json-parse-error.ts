import {ParseError} from "./parse-error";

export class JsonParseError extends ParseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, JsonParseError.prototype)
    }
}
