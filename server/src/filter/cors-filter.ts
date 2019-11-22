/**
 * Enabling CORS for all requests
 *
 * @author Caglar Alkis
 */

import {Filter} from "../core/filter";
import {AppRequest, HttpMethod} from "../core/http";
import {ServerResponse} from "http";

export class CorsFilter implements Filter {
    async execute(req: AppRequest, res: ServerResponse): Promise<void> {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET',
            'Access-Control-Allow-Headers': '*',
        };

        if (req.method === HttpMethod.OPTIONS) {
            res.writeHead(204, headers);
            res.end();
        }

        for (let [header, value] of Object.entries(headers)) {
            res.setHeader(header, value)
        }
    }
}
