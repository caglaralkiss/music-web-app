import {AppRequest, ContentType, HttpResponse, StatusCode} from "../http";
import {ServerResponse} from "http";
import {Route} from "./route";
import {RouterError} from "../error/router/router-error";

export class Router {
    get routes(): Array<Route> {
        return this._routes;
    }

    private readonly _routes: Array<Route>;

    constructor({routes}: {routes: Route[]}) {
        this._routes = routes;
    }

    async passRequestToRoute(req: AppRequest, res: ServerResponse): Promise<void> {
        try {
            const route: Route = this._findRoute(req.path);

            const {status, payload, headers}: HttpResponse = await route.passToController(req);
            
            switch (headers['content-type']) {
                case ContentType.MULTIPART_FORM_DATA:
                case ContentType.TEXT_PLAIN:
                default:
                case ContentType.APPLICATION_JSON:
                    res.writeHead(status, headers);
                    res.end(JSON.stringify(payload));
                    break;
                case ContentType.AUDIO_MPEG:
                    // @TODO Audio fetching logic will be here.
                    break;
            }
        } catch (e) {
            switch (true) {
                default:
                case e instanceof RouterError:
                    const httpResponse =  new HttpResponse.Builder()
                        .setStatus(StatusCode.NOT_FOUND)
                        .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                        .setPayload({})
                        .build();

                    res.writeHead(httpResponse.status, httpResponse.headers);
                    res.end(JSON.stringify(httpResponse.payload));
            }
        }
    }

    private _findRoute(path: string): Route {
        const route = this.routes.find((route) => route.path === path);

        if (route) {
            return route;
        } else {
            throw new RouterError('Route is undefined');
        }
    }
}
