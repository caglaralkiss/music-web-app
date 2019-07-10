/**
 *
 */

import {ParseBehavior} from "../parse-behavior";
import {IncomingMessage} from "http";
import {JsonParseError} from "../../../error/http/parser";

export class JsonStrategy implements ParseBehavior {
   parse(req: IncomingMessage): Promise<object> {
       return new Promise((resolve, reject) => {
          const buffer: Array<any> = [];

          req.on('data', (chunk) => {
             buffer.push(chunk);
          });

          req.on('end', () => {
              try {
                  const bufferObj = JSON.parse(Buffer.concat(buffer).toString());
                  resolve(bufferObj);
              } catch (e) {
                  resolve({})
              }
          });

          req.on('error', () => {
              reject(new JsonParseError('Error on fetching stream'));
          })
       });
   }
}
