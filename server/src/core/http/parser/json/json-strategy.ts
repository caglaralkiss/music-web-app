/**
 *
 */

import {ParseBehavior} from "../parse-behavior";
import {IncomingMessage} from "http";

export class JsonStrategy implements ParseBehavior {
   parse(req: IncomingMessage): Promise<object> {
       return new Promise((resolve, reject) => {
          const buffer: Array<any> = [];

          req.on('data', (chunk) => {
             buffer.push(chunk);
          });

          req.on('end', () => {
              resolve(JSON.parse(Buffer.concat(buffer).toString()));
          });

          req.on('error', () => {
              reject(new Error('Error on fetching stream'));
          })
       });
   }
}
