import {Route} from "../core/router";
import {AppRequest, ContentType, HttpMethod, HttpResponse, ResponseBuilder, StatusCode} from "../core/http";
import {UserController} from "../controller/user-controller";

export class UserRoute extends Route {
    constructor({path, controller}: {path: string, controller: UserController}) {
        super({path, controller});
    }

    async passToController(req: AppRequest): Promise<HttpResponse<any>> {
        const {body, queryStringObj, method} = req;

        switch (method) {
            case HttpMethod.GET:
                return await this._controller.get(req);
            case HttpMethod.DELETE:
                return await this._controller.delete(req);
            case HttpMethod.PUT:
                return await this._controller.put(req);
            case HttpMethod.POST:
                return await this._controller.post(req);
            default:
                return new ResponseBuilder()
                    .setStatus(StatusCode.METHOD_NOT_ALLOWED)
                    .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                    .setPayload({})
                    .build();
        }
    }

}
