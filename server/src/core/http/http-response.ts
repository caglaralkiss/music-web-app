/**
 * Defines a Http response object with a static builder class in it.
 *
 * @author Caglar Alkis
 */

import {StatusCode} from "./status-code";
import {OutgoingHttpHeaders} from "http";

export class HttpResponse {
    status: StatusCode;
    headers: OutgoingHttpHeaders;
    payload: any;

    constructor(build: any) {
        this.status = build.status;
        this.headers = build.headers;
        this.payload = build.payload;
    }

    static get Builder() {
        class Builder {
            private status: StatusCode;
            private headers: OutgoingHttpHeaders;
            private payload: any;

            constructor() {}

            setStatus(status: StatusCode) {
                this.status = status;
                return this;
            }

            setHeaders(headers: OutgoingHttpHeaders) {
                this.headers = headers;
                return this;
            }

            setPayload(payload: any) {
                this.payload = payload;
                return this;
            }

            build() {
                return new HttpResponse(this);
            }
        }

        return Builder;
    }
}
