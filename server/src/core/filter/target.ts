/**
 * Resource requested by the client.
 */

import {AppRequest} from "../http";
import {ServerResponse} from "http";

export class Target {
    execute(req: AppRequest, res: ServerResponse) {
        console.log(`Executing request obj to resource: ${req.path} `);
    }
}
