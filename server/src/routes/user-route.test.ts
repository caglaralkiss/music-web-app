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
