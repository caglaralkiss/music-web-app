import {Filter} from "../core/filter";
import {CorsFilter} from "./cors-filter";
import {AppRequest, HttpMethod} from "../core/http";
import {IncomingMessage, ServerResponse} from 'http';

describe('CorsFilter', () => {
    let corsFilter: Filter;
    let req: AppRequest;
    let res: ServerResponse;

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': '*',
    };

    beforeEach(() => {
        corsFilter = new CorsFilter();
        req = {
            headers: {},
            method: HttpMethod.OPTIONS
        } as AppRequest;
        res = new ServerResponse({} as IncomingMessage);
    });

    test('should add Cors related headers', async () => {
        spyOn(res, 'writeHead').and.callFake((statusCode, headers) => {});
        spyOn(res, 'end').and.callFake(() => {});

        await corsFilter.execute(req, res);

        expect(res.writeHead).toHaveBeenCalledWith(204, headers);
        expect(res.end).toHaveBeenCalled();
    });
});
