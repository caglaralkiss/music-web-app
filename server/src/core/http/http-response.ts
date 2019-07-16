/**
 * Defines a Http response object with a static builder class in it.
 *
 * @author Caglar Alkis
 */

import {StatusCode} from "./status-code";
import {OutgoingHttpHeaders} from "http";

export class HttpResponse<T = any> {
    status: StatusCode;
    headers: OutgoingHttpHeaders;
    payload: T;

    constructor(responseBuilder: ResponseBuilder<T>) {
        this.status = responseBuilder.status;
        this.headers = responseBuilder.headers;
        this.payload = responseBuilder.payload;
    }
}

export class ResponseBuilder<T> {
    private _status: StatusCode;
    private _headers: OutgoingHttpHeaders;
    private _payload: T;

    constructor() {}

    setStatus(status: StatusCode) {
        this._status = status;
        return this;
    }

    setHeaders(headers: OutgoingHttpHeaders) {
        this._headers = headers;
        return this;
    }

    setPayload(payload: T) {
        this._payload = payload;
        return this;
    }

    build() {
        return new HttpResponse<T>(this);
    }

    get payload(): T {
        return this._payload;
    }
    get headers(): OutgoingHttpHeaders {
        return this._headers;
    }
    get status(): StatusCode {
        return this._status;
    }
}
