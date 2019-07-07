import {FormStrategy} from "./form-strategy";
import * as formidable from 'formidable';
import {IncomingMessage} from 'http';

describe('FormStrategy', () => {
    let formStrategy: FormStrategy;

    class MockIncomingForm {
        parse(req: IncomingMessage, callback: (err: any, fields: any, files: any) => any) {
            return Promise.resolve(mockResult);
        }
    }

    const mockResult = {
        fields: ['name', 'surname', 'mail'],
        files: ['file1', 'file2'],
    };

    beforeEach(() => {
        formStrategy = new FormStrategy();


        spyOn(formidable.IncomingForm.prototype, 'parse').and.callFake(MockIncomingForm.prototype.parse);
    });

    it('should parse the form data', () => {
       formStrategy.parse({} as IncomingMessage).then((formResult) => {
           expect(formResult).toEqual(mockResult);
       });
    });
});
