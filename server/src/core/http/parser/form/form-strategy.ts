import {ParseBehavior} from "../parse-behavior";
import {IncomingMessage} from "http";
import {FormParseError} from "../../../error/http/parser";
import {IncomingForm, Fields, Files} from "formidable";

export class FormStrategy implements ParseBehavior {
    parse(req: IncomingMessage): Promise<{fields: Fields, files: Files}> {
        return new Promise((resolve, reject) => {
            new IncomingForm().parse(req, (err, fields, files) => {
               if (err) {
                   reject(new FormParseError(err.message ? err.message : 'Malfunctioned form is arrived.'));
               }
               resolve({fields, files});
            });
        });
    }
}
