/**
 * Helpers function for Server class.
 *
 * @author Caglar Alkis
 */

import {ContentType} from "../core/http";
import {BodyParser, FormParser, JsonParser} from "../core/http/parser";
import {ParseError} from "../core/error/http/parser";


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
