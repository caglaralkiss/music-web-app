/**
 * Route of a ping request.
 *
 * @author Caglar Alkis
 */

import {Controller, Route} from "../core/router";
import {AppRequest, ContentType, HttpResponse} from "../core/http";

export class PingRoute extends Route {
    /**
     * @param path - defines path of the route.
     * @param controller - no controller needed for this route.
     */
    constructor({path, controller}: {path: string, controller: Controller}) {
        super({path, controller});
    }

    /**
     * Returns a Promise<HttpResponse> directly if server is up.
     *
     * @param req
     */
    async passToController(req: AppRequest): Promise<HttpResponse> {
        return new HttpResponse.Builder()
            .setStatus(200)
            .setHeaders({'content-type': ContentType.APPLICATION_JSON})
            .setPayload({})
            .build();
    }
}
