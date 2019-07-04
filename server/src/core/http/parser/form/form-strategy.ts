import {ParseBehavior} from "../parse-behavior";
import {IncomingMessage} from "http";
import * as formidable from 'formidable';

export class FormStrategy implements ParseBehavior {
    parse(req: IncomingMessage): Promise<{fields: any, files: any}> {
        return new Promise((resolve, reject) => {
            new formidable.IncomingForm().parse(req, (err, fields, files) => {
               if (err) {
                   console.log(err);
                   reject(err);
               }
               resolve({fields, files});
            });
        });
    }
}
