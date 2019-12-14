import { Controller, Route } from "../core/router";
import { Filter } from "../core/filter";

export class UserRoute extends Route {
    constructor({path, controller, filters}: {path: string, controller: Controller, filters: Array<Filter>}) {
        super({path, controller, filters});
    }
}
