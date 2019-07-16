import {HttpResponse, ResponseBuilder} from "./http-response";
import {StatusCode} from "./status-code";

describe('HttpResponse', () => {
   test('should build a HttpResponse object', () => {
       const response: HttpResponse = new ResponseBuilder()
           .setHeaders({'Content-Type': 'application/json'})
           .setPayload({})
           .setStatus(StatusCode.NOT_FOUND)
           .build();

       expect(response instanceof HttpResponse).toBe(true);
   });

   test('should get properties from created object', () => {
       const statusCode = StatusCode.NOT_FOUND;
       const responseWithStatusCode = new ResponseBuilder()
           .setStatus(statusCode)
           .build();

       expect(responseWithStatusCode.status).toBe(StatusCode.NOT_FOUND);
   })
});
