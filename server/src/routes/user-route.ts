import {Controller, Route} from "../core/router";
import {AppRequest, ContentType, HttpMethod, HttpResponse, ResponseBuilder, StatusCode} from "../core/http";
import {Filter} from "../core/filter";
import {ServerResponse} from "http";

export class UserRoute extends Route {
    constructor({path, controller, filters}: {path: string, controller: Controller, filters: Array<Filter>}) {
        super({path, controller, filters});
    }

    async passToController(req: AppRequest, res: ServerResponse): Promise<HttpResponse<any>> {
        const {method} = req;

        let finalResponse: HttpResponse;

        this.filterManager.doFilter(req, res);

        switch (method) {
            case HttpMethod.GET:
                finalResponse = await this._controller.get(req);
                break;
            case HttpMethod.DELETE:
                finalResponse = await this._controller.delete(req);
                break;
            case HttpMethod.PUT:
                finalResponse = await this._controller.put(req);
                break;
            case HttpMethod.POST:
                finalResponse = await this._controller.post(req);
                break;
            default:
                finalResponse = new ResponseBuilder()
                    .setStatus(StatusCode.METHOD_NOT_ALLOWED)
                    .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                    .setPayload({})
                    .build();
                break;
        }

        return {
            ...finalResponse,
            headers: {'content-type': ContentType.APPLICATION_JSON},
            payload: finalResponse.payload ? finalResponse.payload : {}
        }
    }
}
