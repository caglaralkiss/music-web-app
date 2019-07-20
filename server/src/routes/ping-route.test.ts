import {Controller, Route} from "../core/router";
import {PingRoute} from "./ping-route";
import {AppRequest, StatusCode} from "../core/http";
import {ServerResponse} from 'http';

describe('Ping Route', () => {
   let pingRoute: Route;
   let mockAppReq: AppRequest = {
       path: 'ping',
   } as AppRequest;
   
   beforeEach(() => {
      pingRoute = new PingRoute({path: 'ping', controller: {} as Controller, filters: []});
   });
   
   test('should return 200 status code and empty object if server is up', async () => {
       const response = await pingRoute.passToController(mockAppReq, {} as ServerResponse);
       
       expect(response.status).toBe(StatusCode.OK);
       expect(response.payload).toEqual({});
   });
});
