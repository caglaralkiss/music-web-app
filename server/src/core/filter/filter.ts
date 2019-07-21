/**
 * Interface for individual filters that are mapped to target.
 *
 * @author Caglar Alkis
 */

import {ServerResponse} from "http";
import {AppRequest} from "../http";

export interface Filter {
    execute(req: AppRequest, res: ServerResponse): Promise<void>
}
