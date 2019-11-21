import {Controller, Route} from "../core/router";
import {AppRequest, ContentType, HttpResponse, ResponseBuilder, StatusCode} from "../core/http";
import {Filter} from "../core/filter";
import {ServerResponse} from "http";

export class UserRoute extends Route {
    constructor({path, controller, filters}: {path: string, controller: Controller, filters: Array<Filter>}) {
        super({path, controller, filters});
    }

    async passToController(req: AppRequest, res: ServerResponse): Promise<HttpResponse<any>> {
        let finalResponse: HttpResponse = await this._controller[req.method](req);

        if (!finalResponse) {
            finalResponse = new ResponseBuilder()
                .setStatus(StatusCode.METHOD_NOT_ALLOWED)
                .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                .setPayload({})
                .build();
        }

        return {
            ...finalResponse,
            headers: {'content-type': ContentType.APPLICATION_JSON},
            payload: finalResponse.payload ? finalResponse.payload : {}
        }
    }
}
