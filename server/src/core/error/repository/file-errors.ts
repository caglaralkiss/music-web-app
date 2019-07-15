import {BaseError} from "../base-error";

export class FileReadError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, FileReadError);
    }
}

export class FileWriteError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, FileWriteError);
    }
}

export class DirectoryNotExistError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, DirectoryNotExistError);
    }
}

export class FileNotExistsError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, FileNotExistsError);
    }
}

export class FileDeleteError extends BaseError {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, FileDeleteError);
    }
}
