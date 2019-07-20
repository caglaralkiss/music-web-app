import {AppRequest, HttpResponse} from "../http";
import {Controller} from "./controller";
import {Filter, FilterManager, Target} from "../filter";
import {ServerResponse} from "http";

export abstract class Route {
    get path(): string {
        return this._path;
    }

    protected readonly _path: string;
    protected readonly filterManager: FilterManager;
    protected _controller: Controller;

    /**
     * @param path - Path of the incoming {@link AppRequest}.
     * @param controller - {@interface Controller} object that will be handle the request object.
     * @param filters - Array of {@interface Filter} that will intercept req/res object.
     */
    protected constructor({path, controller, filters}: {path: string, controller: Controller, filters: Array<Filter>}) {
        this._path = path;
        this._controller = controller;
        this.filterManager = new FilterManager(new Target());

        filters.forEach((filter) => this.filterManager.setFilter(filter));
    }

    /**
     * Map {@link AppRequest} to {@link Controller} object and returns {@link HttpResponse} object.
     * Also, it may do pre&post operations(e.g do filtering via {@link Filter}) before passing it to controller.
     *
     * @param req
     * @param res
     */
    async abstract passToController(req: AppRequest, res: ServerResponse): Promise<HttpResponse>;
}
