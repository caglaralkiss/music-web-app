import {Controller, Route} from "../core/router";
import {AppRequest, ContentType, HttpMethod, HttpResponse, ResponseBuilder, StatusCode} from "../core/http";
import {ServerResponse} from "http";
import {Filter} from "../core/filter";

export class AuthRoute extends Route {

    constructor({path, controller, filters}: {path: string, controller: Controller, filters: Array<Filter>}) {
        super({path, controller, filters});
    }

    async passToController(req: AppRequest, res: ServerResponse): Promise<HttpResponse> {
        const {method} = req;
        
        let finalResponse: HttpResponse;

        await this.filterManager.doFilter(req, res);

        switch (method) {
            case HttpMethod.POST:
                finalResponse = await this._controller.post(req);
                break;
            default:
                return new ResponseBuilder()
                    .setStatus(StatusCode.METHOD_NOT_ALLOWED)
                    .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                    .build()
        }

        return {
            ...finalResponse,
            headers: {'content-type': ContentType.APPLICATION_JSON},
            payload: finalResponse.payload ? finalResponse.payload : {}
        }
    }
}
