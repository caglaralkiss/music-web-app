/**
 * Resource requested by the client.
 */

import {AppRequest} from "../http";
import {ServerResponse} from "http";

export class Target {
    async execute(req: AppRequest, res: ServerResponse): Promise<void> {
        await console.log(`Executing request obj to resource: ${req.path} `);
    }
}
