import {BodyParser} from "../body-parser";
import {JsonStrategy} from "./json-strategy";

export class JsonParser extends BodyParser {
    constructor() {
        super();
        this.parseBehavior = new JsonStrategy();
    }
}
