/**
 * Server logic of the project.
 *
 * @author Caglar Alkis
 */

import {createServer, IncomingMessage, Server, ServerResponse} from "http";
import {Config} from "../config/config";
import {BodyParser} from "../core/http/parser";
import {ContentType} from "../core/http/content-type";
import {getParser} from "./helpers";

function httpServer(): Server {
    let bodyParser: BodyParser;
    let contentType: ContentType;

    return createServer(async (req: IncomingMessage, res: ServerResponse) => {
        try {
            contentType = req.headers['content-type'] as ContentType;
            bodyParser = getParser(contentType);

            console.log(await bodyParser.performParse(req))
        } catch (e) {
            console.log(e);
        }
    })
}

function init() {
    const config = Config.getInstance();

    httpServer().listen(config.port, () => {
        console.log(`Server is listening requests on port: ${config.port} at environment: ${config.environment}`);
    })
}

export default {
    httpServer,
    init
}
