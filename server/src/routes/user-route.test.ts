import {UserRoute} from "./user-route";
import {Filter} from "../core/filter";
import {Controller} from "../core/router";
import {AppRequest, HttpMethod} from "../core/http";
import {ServerResponse} from 'http';
import {UserController} from "../controller";
import {UserService} from "../service";

describe('UserRoute', () => {
   let userRoute: UserRoute;
   let filter: Filter;
   let controller: Controller;

   class MockFilter implements Filter {
       async execute(req: AppRequest, res: ServerResponse): Promise<void> {
       }
   }

   beforeEach(() => {
      filter = new MockFilter();
      controller = new UserController({userService: {} as UserService});
      userRoute = new UserRoute({path: 'users', controller, filters: [filter]});
   });

   test('should execute filters first', async () => {
       spyOn(userRoute.filterManager, 'doFilter');
       spyOn(controller, 'get').and.returnValue(Promise.resolve({status: 200, payload: {}, headers: {}}));

       const req: AppRequest = {method: HttpMethod.GET} as AppRequest;
       const res: ServerResponse = {} as ServerResponse;
       await userRoute.passToController(req, res);

       expect(userRoute.filterManager.doFilter).toHaveBeenCalledWith(req, res);
   });

   test('should pass request to the correct method', async () => {
       const req: AppRequest = {method: HttpMethod.DELETE} as AppRequest;
       const res: ServerResponse = {} as ServerResponse;

       spyOn(controller, 'delete').and.returnValue(Promise.resolve({
           status: 200,
           payload: {},
           headers: {}
       }));

       await userRoute.passToController(req, res);
       expect(controller.delete).toHaveBeenCalledWith(req);
   })
});
