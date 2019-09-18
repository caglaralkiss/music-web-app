/**
 * Server logic of the project.
 *
 * @author Caglar Alkis
 */

import {createServer, IncomingMessage, Server, ServerResponse} from "http";
import {Config} from "../config/config";
import {AppRequest, ContentType, HttpMethod, StatusCode} from "../core/http";
import {parseBody} from "./helpers";
import * as URL from 'url';
import {Route, Router} from "../core/router";
import RoutesRoot from "../routes/routes-root";

function httpServer(): Server {
    let router: Router = createRouter();

    return createServer(async (req: IncomingMessage, res: ServerResponse) => {
        try {
            const body = await parseBody(req);
            const appReq: AppRequest = buildAppRequest(req, body);

            await router.passRequestToRoute(appReq, res);
        } catch (e) {
            res.setHeader('content-type', ContentType.TEXT_PLAIN);
            res.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
            res.end(e.message, 'utf-8');
        }
    })
}

function init() {
    const config = Config.getInstance();

    httpServer().listen(config.port, () => {
        console.log(`Server is listening requests on port: ${config.port} at environment: ${config.environment}`);
    })
}

function buildAppRequest(req: IncomingMessage, body: Body): AppRequest {
    const {method, url, headers} = req;

    const parsedUrl = URL.parse(url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const queryStringObj = parsedUrl.query;

    return {
        path: trimmedPath,
        method: method.toLowerCase() as HttpMethod,
        headers,
        queryStringObj,
        body
    }
}

function createRouter(): Router {
    let routes: Array<Route> = [];

    for (let [routeName, routeObj] of Object.entries(RoutesRoot)) {
        routes.push(routeObj);
    }

    return new Router({routes});
}

export default {
    init
}
