import {ParseBehavior} from "../parse-behavior";
import {IncomingMessage} from "http";
import * as formidable from 'formidable';
import {FormParseError} from "../../../error/http/parser/form-parse-error";

export class FormStrategy implements ParseBehavior {
    parse(req: IncomingMessage): Promise<{fields: any, files: any}> {
        return new Promise((resolve, reject) => {
            new formidable.IncomingForm().parse(req, (err, fields, files) => {
               if (err) {
                   reject(new FormParseError(err.message ? err.message : 'Malfunctioned form is arrived.'));
               }
               resolve({fields, files});
            });
        });
    }
}
