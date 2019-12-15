import {BaseError} from "../base-error";

export class PlaylistNotExistsError extends BaseError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, PlaylistNotExistsError.prototype);
  }
}

export class PlaylistAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, PlaylistAlreadyExistsError.prototype);
  }
}
