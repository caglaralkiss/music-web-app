/**
 * Controller interface
 *
 * @author Caglar Alkis
 */

import {AppRequest, HttpResponse} from "../http";

export interface Controller {
    get(req: AppRequest): Promise<HttpResponse>;
    post(req: AppRequest): Promise<HttpResponse>;
    put(req: AppRequest): Promise<HttpResponse>;
    delete(req: AppRequest): Promise<HttpResponse>
}
