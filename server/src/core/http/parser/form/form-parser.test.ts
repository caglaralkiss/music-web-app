import {FormParser} from "./form-parser";
import {FormStrategy} from "./form-strategy";
import {IncomingMessage} from 'http';

describe('FormParser', () => {
   let formParser: FormParser;

   beforeEach(() => {
       formParser = new FormParser();

       spyOn(FormStrategy.prototype, 'parse');
   });

    it('should call parse of the incoming form', async () => {
       await formParser.performParse({} as IncomingMessage);

       expect(formParser.parseBehavior.parse).toHaveBeenCalledTimes(1);
    });
});
