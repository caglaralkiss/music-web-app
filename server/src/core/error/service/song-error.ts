import {BaseError} from "../base-error";

export class SongNotExistsError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, SongNotExistsError.prototype);
    }
}

export class SongAlreadyExistsError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, SongAlreadyExistsError.prototype);
    }
}
