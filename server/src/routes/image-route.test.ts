import {ImageRoute} from "./image-route";
import {Controller} from "../core/router";
import fs from "../util/promisified/fs";
import {AppRequest, HttpMethod, HttpResponse, StatusCode} from "../core/http";
import {ServerResponse} from 'http';

describe('ImageRoute', () => {
    let imageRoute: ImageRoute;
    let req: AppRequest;
    let res: ServerResponse;

    beforeEach(() => {
        imageRoute = new ImageRoute({path: 'image', controller: {} as Controller, filters: [], fs});
        req = {
            id: null,
            method: null,
            path: null,
            headers: null,
            body: null,
            queryStringObj: {}
        };
    });

    test('should send bad request when request doesnt have id', async () => {
        req.method = HttpMethod.GET;
        const httpResp = await imageRoute.passToController(req, res);

        expect(httpResp.status).toEqual(StatusCode.BAD_REQUEST);
    });

    test('should only response to GET request', async () => {
        req.method = HttpMethod.DELETE;
        req.queryStringObj = {id: '123456'};
        const res: ServerResponse = {} as ServerResponse;

        const httpResp = await imageRoute.passToController(req, res);

        expect(httpResp.status).toEqual(StatusCode.METHOD_NOT_ALLOWED);
    });

    test('should send not found when resource doesnt found', async () => {
        req.method = HttpMethod.GET;
        req.queryStringObj = {
            id: 'someId'
        };
        let httpResp: HttpResponse;

        spyOn(fs, 'createReadStream').and.callFake(() => {
            throw new Error('ENOENT');
        });

        try {
            httpResp = await imageRoute.passToController(req, res);
        } catch (e) {
            expect(httpResp.status).toEqual(StatusCode.NOT_FOUND);
        }
    });
});
