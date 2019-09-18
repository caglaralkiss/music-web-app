/**
 * Helpers function for Server class.
 *
 * @author Caglar Alkis
 */

import {ContentType} from "../core/http";
import {BodyParser, FormParser, JsonParser} from "../core/http/parser";
import {ParseError} from "../core/error/http/parser";
import {IncomingMessage} from "http";


/**
 * Produce parser for different type of content-type requests.
 *
 * @param contentType ContentType
 * @returns parser BodyParser
 */

export function getParser(contentType: ContentType): BodyParser {
    /** Trimmed for possible multipart/form-data boundary **/
    let trimmedContentType = contentType.split(';')[0];

    switch (trimmedContentType) {
        case ContentType.APPLICATION_JSON:
            return new JsonParser();
        case ContentType.MULTIPART_FORM_DATA:
            return new FormParser();
        default:
            throw new ParseError('Undefined Content Type!');
    }
}

/**
 * Detects content type and parse the request object to produce a body.
 *
 * @param req
 */
export async function parseBody(req: IncomingMessage) {
    let bodyParser: BodyParser;
    let contentType: ContentType;

    if (!req.headers['content-type']) {
        req.headers['content-type'] = ContentType.APPLICATION_JSON;
    }

    contentType = req.headers['content-type'] as ContentType;
    bodyParser = getParser(contentType);

    return await bodyParser.performParse(req);
}
