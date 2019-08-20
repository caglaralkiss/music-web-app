import {UserFilter} from "./user-filter";
import {AppRequest, ContentType, HttpMethod, StatusCode} from "../core/http";
import {IncomingMessage, ServerResponse} from 'http';
import {BaseError} from "../core/error";

describe('UserFilter', () => {
    let userFilter: UserFilter;
    let req: AppRequest;
    let res: ServerResponse;

    beforeEach(() => {
        userFilter = new UserFilter();
        req = {
            queryStringObj: {},
            body: {},
            method: null,
        } as AppRequest;
        res = new ServerResponse({} as IncomingMessage);

        spyOn(res, 'writeHead');
        spyOn(res, 'end');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should filter request with DELETE method when email is not defined', async () => {
        req.queryStringObj.id = undefined;
        req.method = HttpMethod.DELETE;

        await userFilter.execute(req, res);

        expect(res.writeHead).toHaveBeenCalledWith(StatusCode.BAD_REQUEST, {'content-type': ContentType.APPLICATION_JSON});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(new BaseError('Email is required!').getJson()));
    });

    test('should pass filter request with DELETE method when email is valid', async () => {
        req.queryStringObj.id = 'somevalidmail@gmail.com';
        req.method = HttpMethod.DELETE;

        await userFilter.execute(req, res);

        expect(res.writeHead).not.toHaveBeenCalled();
        expect(res.end).not.toHaveBeenCalled();
    });

    test('should filter request with POST method when required fields are absent', async () => {
        req.body = {
            name: 'mock',
            surname: 'mockson',
            email: 'mockmockson@gmail.com',
            password: null
        };
        req.method = HttpMethod.POST;

        await userFilter.execute(req, res);

        expect(res.writeHead).toHaveBeenCalledWith(StatusCode.BAD_REQUEST, {'content-type': ContentType.APPLICATION_JSON});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(new BaseError('Password is required!').getJson()));
    });

    test('should filter request with POST method when one field is not valid', async () => {
        req.body = {
            name: 'mock',
            surname: 'mockson',
            email: 'mockmockson',
            password: "chuck1234560"
        };
        req.method = HttpMethod.POST;

        await userFilter.execute(req, res);

        expect(res.writeHead).toHaveBeenCalledWith(StatusCode.BAD_REQUEST, {'content-type': ContentType.APPLICATION_JSON});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(new BaseError('Mail is not valid!').getJson()));
    });


});
