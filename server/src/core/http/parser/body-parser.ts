/**
 * Models an abstract parser class.
 *
 * Concrete classes of BodyParser are @Link {JsonParser} and @Link y
 *
 * @author Caglar Alkis
 */

import {ParseBehavior} from "./parse-behavior";
import {IncomingMessage} from "http";

export abstract class BodyParser {
    get parseBehavior(): ParseBehavior {
        return this._parseBehavior;
    }

    set parseBehavior(value: ParseBehavior) {
        this._parseBehavior = value;
    }

    private _parseBehavior: ParseBehavior;

    async performParse(req: IncomingMessage): Promise<any> {
        try {
            return await this.parseBehavior.parse(req);
        } catch (e) {
            throw new Error('JSON Parse error');
        }
    }
}
