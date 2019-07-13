import {Controller, Route} from "../core/router";
import {PingRoute} from "./ping-route";
import {AppRequest, StatusCode} from "../core/http";

describe('Ping Route', () => {
   let pingRoute: Route;
   let mockAppReq: AppRequest = {
       path: 'ping',
   } as AppRequest;
   
   beforeEach(() => {
      pingRoute = new PingRoute({path: 'ping', controller: {} as Controller});
   });
   
   test('should return 200 status code and empty object if server is up', async () => {
       const response = await pingRoute.passToController(mockAppReq);
       
       expect(response.status).toBe(StatusCode.OK);
       expect(response.payload).toEqual({});
   });
});
