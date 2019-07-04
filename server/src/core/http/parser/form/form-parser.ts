import {BodyParser} from "../body-parser";
import {FormStrategy} from "./form-strategy";

export class FormParser extends BodyParser {
    constructor() {
        super();
        this.parseBehavior = new FormStrategy();
    }
}
