import { AppRequest, ContentType, HttpMethod, HttpResponse, ResponseBuilder, StatusCode } from "../http";
import { Controller } from "./controller";
import { Filter, FilterManager, Target } from "../filter";
import { ServerResponse } from "http";

export abstract class Route {
    get path(): string {
        return this._path;
    }

    get filterManager(): FilterManager {
        return this._filterManager;
    }

    protected readonly _path: string;
    protected readonly _filterManager: FilterManager;
    protected _controller: Controller;

    /**
     * @param path - Path of the incoming {@link AppRequest}.
     * @param controller - {@interface Controller} object that will be handle the request object.
     * @param filters - Array of {@interface Filter} that will intercept req/res object.
     */
    protected constructor({path, controller, filters}: {path: string, controller: Controller, filters: Array<Filter>}) {
        this._path = path;
        this._controller = controller;
        this._filterManager = new FilterManager(new Target());

        filters.forEach((filter) => this._filterManager.setFilter(filter));
    }

    /**
     * Map {@link AppRequest} to {@link Controller} object and returns {@link HttpResponse} object.
     * Also, it may do pre&post operations(e.g do filtering via {@link Filter}) before passing it to controller.
     *
     * @param req
     * @param res
     */
    async passToController(req: AppRequest, res: ServerResponse): Promise<HttpResponse> {
        if (this.isMethodAllowed(req.method)) {
            let finalResponse: HttpResponse = await this._controller[req.method](req);

            return {
                ...finalResponse,
                headers: finalResponse.headers ? finalResponse.headers : {'content-type': ContentType.APPLICATION_JSON},
                payload: finalResponse.payload ? finalResponse.payload : {},
            }
        } else {
            return new ResponseBuilder()
              .setStatus(StatusCode.METHOD_NOT_ALLOWED)
              .setHeaders({'content-type': ContentType.APPLICATION_JSON})
              .build();
        }
    }


    /**
     * Check whether the method is allowed in terms of route controller
     */
    isMethodAllowed(method: HttpMethod): boolean {
        return !!this._controller[method]
    }
}
