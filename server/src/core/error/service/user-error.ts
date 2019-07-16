import {BaseError} from "../base-error";

export class UserNotExistsError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, UserNotExistsError.prototype);
    }
}

export class UserAlreadyExistsError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
    }
}
