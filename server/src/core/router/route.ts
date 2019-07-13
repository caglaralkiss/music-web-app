import {AppRequest, HttpResponse} from "../http";
import {Controller} from "./controller";

export abstract class Route {
    get path(): string {
        return this._path;
    }

    protected readonly _path: string;
    protected _controller: Controller;

    protected constructor({path, controller}: {path: string, controller: Controller}) {
        this._path = path;
        this._controller = controller;
    }

    async abstract passToController(req: AppRequest): Promise<HttpResponse>;
}
