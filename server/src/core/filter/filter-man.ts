/**
 * Manages filter processing.
 * It creates the {@link FilterChain} with the appropriate filters in correct order and start filtering process.
 *
 */

import {AppRequest} from "../http";
import {ServerResponse} from "http";
import {Filter} from "./filter";
import {Target} from "./target";
import {FilterChain} from "./filter-chain";

export class FilterManager {
    filterChain: FilterChain;

    constructor(target: Target) {
        this.filterChain = new FilterChain();
        this.filterChain.setTarget(target);
    }

    setFilter(filter: Filter) {
        this.filterChain.addFilter(filter);
    }

    async doFilter(req: AppRequest, res: ServerResponse): Promise<void> {
        await this.filterChain.execute(req, res);
    }
}
