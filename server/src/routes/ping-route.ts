/**
 * Route of a ping request.
 *
 * @author Caglar Alkis
 */

import {Controller, Route} from "../core/router";
import {AppRequest, ContentType, HttpResponse, ResponseBuilder} from "../core/http";
import {Filter} from "../core/filter";
import {ServerResponse} from "http";

export class PingRoute extends Route {
    /**
     * @param path - defines path of the route.
     * @param controller - no controller needed for this route.
     * @param filters - {@link CorsFilter} will be enough to fulfill ping objective.
     */
    constructor({path, controller, filters}: {path: string, controller: Controller, filters: Array<Filter>}) {
        super({path, controller, filters});
    }

    /**
     * Returns a Promise<HttpResponse> directly if server is up.
     *
     * @param req
     * @param res
     */
    async passToController(req: AppRequest, res: ServerResponse): Promise<HttpResponse> {
        return new ResponseBuilder()
            .setStatus(200)
            .setHeaders({'content-type': ContentType.APPLICATION_JSON})
            .setPayload({})
            .build();
    }
}
