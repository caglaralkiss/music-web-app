import {Filter} from "../core/filter";
import {AppRequest} from "../core/http";
import {ServerResponse} from "http";

export class LoggingFilter implements Filter {
    async execute(req: AppRequest, res: ServerResponse): Promise<void> {
        // @TODO implement better solution to logging
        /*
        let oldWrite = res.write,
            oldEnd = res.end;

        let chunks: any = [];

        res.write = (chunk: any) => {
            chunks.push(new Buffer(chunk));

            oldWrite.apply(res, arguments);
            return true;
        };

        res.end = (chunk: any) => {
            if (chunk)
                chunks.push(Buffer.from(chunk));

            let body = Buffer.concat(chunks).toString('utf8');
            console.log(req.path, body);

            oldEnd.apply(res, arguments);
        };
        */
    }
}
