import {BaseError} from "../base-error";

export class RepositoryReadError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, RepositoryReadError);
    }
}

export class RepositoryWriteError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, RepositoryWriteError.prototype);
    }
}

export class EntityNotExistsError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, EntityNotExistsError.prototype);
    }
}

export class RepositoryDeleteError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, RepositoryDeleteError.prototype);
    }
}
