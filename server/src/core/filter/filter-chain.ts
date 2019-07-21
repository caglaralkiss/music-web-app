/**
 * Ordered collection of the independent filters.
 *
 */

import {AppRequest} from "../http";
import {ServerResponse} from "http";
import {Filter} from "./filter";
import {Target} from "./target";

export class FilterChain {
    private filters: Array<Filter> = [];
    private target: Target;

    addFilter(filter: Filter) {
        this.filters.push(filter);
    }

    async execute(req: AppRequest, res: ServerResponse) {
        for (const filter of this.filters) {
            await filter.execute(req,res)
        }

        await this.target.execute(req, res);
    }

    setTarget(target: Target) {
        this.target = target;
    }
}
