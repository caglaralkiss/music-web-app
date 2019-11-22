import {BaseError} from "../base-error";

export class FilterError extends BaseError {
  constructor(message?: string) {
    super(message || '');

    Object.setPrototypeOf(this, FilterError.prototype)
  }
}
