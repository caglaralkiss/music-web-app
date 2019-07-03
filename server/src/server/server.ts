/**
 * Server logic of the project.
 *
 * @author Caglar Alkis
 */

import {createServer, IncomingMessage, Server, ServerResponse} from "http";
import {Config} from "../config/config";

export default class HttpServer {
    private static server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World!', 'utf-8');
    });

    static init() {
        const config = Config.getInstance();

        HttpServer.server.listen(config.port, () => {
            console.log(`Server is listening requests on port: ${config.port} at environment: ${config.environment}`)
        });
    }
}
