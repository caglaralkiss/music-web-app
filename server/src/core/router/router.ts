/**
 * Router class handles the problem of passing req&res objects to proper Route.
 *
 * @author Caglar Alkis
 */

import {AppRequest, ContentType, HttpResponse, ResponseBuilder, StatusCode} from "../http";
import {ServerResponse} from "http";
import {Route} from "./route";
import {BaseError, RouterError} from "../error";

export class Router {
    /* Assigned routes */
    get routes(): Array<Route> {
        return this._routes;
    }

    private readonly _routes: Array<Route>;

    constructor({routes}: { routes: Route[] }) {
        this._routes = routes;
    }

    /**
     * Pass req(i.e {@Link AppRequest}) and res objects to the defined route to process request&response
     *
     * @param req
     * @param res
     */
    async passRequestToRoute(req: AppRequest, res: ServerResponse): Promise<void> {
        try {
            const route: Route = this.findRoute(req.path);

            const {status, payload, headers}: HttpResponse = await route.passToController(req, res);

            switch (headers['content-type']) {
                case ContentType.IMAGE_JPEG:
                    res.writeHead(status, headers);
                    payload.pipe(res);
                    break;
                case ContentType.MULTIPART_FORM_DATA:
                case ContentType.TEXT_PLAIN:
                default:
                case ContentType.APPLICATION_JSON:
                    res.writeHead(status, headers);
                    res.end(JSON.stringify(payload));
                    break;
                case ContentType.AUDIO_MPEG:
                    res.writeHead(status, headers);
                    payload.pipe(res);
                    break;
            }
        } catch (e) {
            let httpResponse: HttpResponse;

            switch (true) {
                case e instanceof RouterError:
                    httpResponse = new ResponseBuilder()
                        .setStatus(StatusCode.NOT_FOUND)
                        .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                        .setPayload(new BaseError('Non-existent API endpoint').getJson())
                        .build();
                    break;
                default:
                    httpResponse = new ResponseBuilder()
                        .setStatus(StatusCode.INTERNAL_SERVER_ERROR)
                        .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                        .setPayload({'Error': e.message || 'Bad routing process'})
                        .build();
                    break;
            }
            res.writeHead(httpResponse.status, httpResponse.headers);
            res.end(JSON.stringify(httpResponse.payload));
        }
    }

    /**
     * Find the proper route based on the path param.
     * If there is no route with given path, it throws {@link RouterError}
     *
     * @param path
     * @return route
     */
    findRoute(path: string): Route {
        const route = this.routes.find((route) => route.path === path);

        if (route) {
            return route;
        } else {
            throw new RouterError('Route is undefined');
        }
    }
}
