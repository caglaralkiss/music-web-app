import {IncomingMessage} from "http";

export interface ParseBehavior {
    parse: (req: IncomingMessage) => Promise<any>
}
