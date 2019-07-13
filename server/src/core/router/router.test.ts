import {Route} from "./route";
import {IncomingMessage, ServerResponse} from 'http';
import {AppRequest, ContentType, HttpResponse, StatusCode} from "../http";
import {Controller} from "./controller";
import {Router} from "./router";

describe('Router', () => {
    let router: Router;
    let mockRoutes: Array<Route>;
    const mockPaths: Array<string> = [
        'mockPath1',
        'mockPath2',
        'mockPath3',
        'undefinedPath'
    ];
    const mockRequests: Array<AppRequest> = [
        {
            path: mockPaths[0],
            headers: {'content-type': ContentType.APPLICATION_JSON}
        } as AppRequest,
        {
            path: mockPaths[1],
            headers: {'content-type': ContentType.TEXT_PLAIN}
        } as AppRequest,
        {
            path: mockPaths[2],
            headers: {'content-type': ContentType.MULTIPART_FORM_DATA}
        } as AppRequest,
    ];

    class MockRoute extends Route {
        constructor({path, controller}: {path: string, controller: Controller}) {
            super({path, controller});
        }

        async passToController(req: AppRequest): Promise<HttpResponse> {
            const mockResponse: HttpResponse = {
                status: StatusCode.OK,
                headers: {'content-type': req.headers["content-type"]},
                payload: {
                    requestedPath: req.path,
                    requestedHeaders: req.headers,
                }
            };

            return mockResponse;
        }
    }

    beforeEach(() => {
        mockRoutes = [
            new MockRoute({path: mockPaths[0], controller: {} as Controller}),
            new MockRoute({path: mockPaths[1], controller: {} as Controller}),
            new MockRoute({path: mockPaths[2], controller: {} as Controller})
        ];

        router = new Router({routes: mockRoutes});

        spyOn(ServerResponse.prototype, 'writeHead');
        spyOn(ServerResponse.prototype, 'end');
    });

    test('should route the request depends on their route', async () => {
        let mockRes: ServerResponse = new ServerResponse({} as IncomingMessage);

        await router.passRequestToRoute(mockRequests[0], mockRes);
        expect(mockRes.writeHead).toHaveBeenCalledWith(StatusCode.OK, mockRequests[0].headers);
        expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({
            requestedPath: mockRequests[0].path,
            requestedHeaders: mockRequests[0].headers,
        }));

        await router.passRequestToRoute(mockRequests[1], mockRes);
        expect(mockRes.writeHead).toHaveBeenCalledWith(StatusCode.OK, mockRequests[1].headers);
        expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({
            requestedPath: mockRequests[1].path,
            requestedHeaders: mockRequests[1].headers,
        }));

        await router.passRequestToRoute(mockRequests[2], mockRes);
        expect(mockRes.writeHead).toHaveBeenCalledWith(StatusCode.OK, mockRequests[2].headers);
        expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({
            requestedPath: mockRequests[2].path,
            requestedHeaders: mockRequests[2].headers,
        }));
    });

    test('should response 404 when undefined route is demanded', async () => {
        let mockRes: ServerResponse = new ServerResponse({} as IncomingMessage);
        const mockAppReq: AppRequest = {
            path: mockPaths[4],
            headers: {'content-type': ContentType.APPLICATION_JSON}
        } as AppRequest;

        await router.passRequestToRoute(mockAppReq, mockRes);
        expect(mockRes.writeHead).toHaveBeenCalledWith(StatusCode.NOT_FOUND, mockAppReq.headers);
        expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({}));
    })
});
