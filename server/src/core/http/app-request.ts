/**
 * Model of a filtered {@Link IncomingMessage}. Also, it holds body object.
 *
 * @author Caglar Alkis
 */

import {HttpMethod} from "./http-method";
import {IncomingHttpHeaders} from "http";

export interface AppRequest {
    path: string,
    method: HttpMethod,
    headers: IncomingHttpHeaders,
    queryStringObj?: Record<string, any>,
    body?: any
}