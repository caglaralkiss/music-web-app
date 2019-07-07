import {BodyParser} from "./body-parser";
import {ParseBehavior} from "./parse-behavior";
import {IncomingMessage} from 'http';
import {ContentType} from "../content-type";

describe('BodyParser', () => {
    class MockStrategy1 implements ParseBehavior {
        async parse(req: IncomingMessage): Promise<{parsed: string}> {
            return new Promise((resolve, reject) => {
                if (req.headers["content-type"] === ContentType.TEXT_PLAIN) {
                    resolve({parsed: 'hello world'})
                }
                reject(new Error('You can\'t parse me!'));
            })
        }
    }

    class MockStrategy2 implements ParseBehavior {
        async parse(req: IncomingMessage): Promise<{moreParsed: string}> {
            return new Promise((resolve, reject) => {
                if (req.headers["content-type"] === ContentType.APPLICATION_JSON) {
                    resolve({moreParsed: 'hello world'})
                }
                reject(new Error('You can\'t parse me!'));
            })
        }
    }

    class MockParser extends BodyParser {
        constructor() {
            super();
            this.parseBehavior = new MockStrategy1();
        }
    }

    let bodyParser: BodyParser;

    test('should get concrete parser that has different strategy', async () => {
       bodyParser = new MockParser();
       const mockReq: any = {
           headers: {
               'content-type': ContentType.TEXT_PLAIN
           }
       };
       expect(await bodyParser.performParse(mockReq as IncomingMessage)).toEqual({parsed: 'hello world'});

       mockReq.headers["content-type"] = ContentType.APPLICATION_JSON;

       bodyParser.parseBehavior = new MockStrategy2();
       expect(await bodyParser.performParse(mockReq as IncomingMessage)).toEqual({moreParsed: 'hello world'});

    });
});
