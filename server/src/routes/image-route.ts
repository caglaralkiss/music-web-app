import {Controller, Route} from "../core/router";
import {AppRequest, ContentType, HttpMethod, HttpResponse, ResponseBuilder, StatusCode} from "../core/http";
import {ServerResponse} from "http";
import {Filter} from "../core/filter";
import {BaseError} from "../core/error";
import {Config} from "../config/config";
import {ApiEndpoint} from "../config/api-endpoint";

export class ImageRoute extends Route {
    private _fs: any;

    constructor({path, controller, filters, fs}:
                    {path: string, controller: Controller, filters: Array<Filter>, fs: any}) {
        super({path, controller, filters});
        this._fs = fs;
    }

    async passToController(req: AppRequest, res: ServerResponse): Promise<HttpResponse> {
        try {
            const {method} = req;
            const {id} = req.queryStringObj;

            await this._filterManager.doFilter(req, res);

            if (method === HttpMethod.GET) {
                if (!id) {
                    return new ResponseBuilder()
                        .setStatus(StatusCode.BAD_REQUEST)
                        .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                        .setPayload(new BaseError('Id of file is missing').getJson())
                        .build();
                }
                const imagePath = `${Config.getInstance().db}/${ApiEndpoint.IMAGE}/${id}.jpeg`;

                const payload = this._fs.createReadStream(imagePath);

                return new ResponseBuilder()
                    .setStatus(StatusCode.OK)
                    .setPayload(payload)
                    .setHeaders({'content-type': ContentType.IMAGE_JPEG})
                    .build();
            } else {
                return new ResponseBuilder()
                    .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                    .setStatus(StatusCode.METHOD_NOT_ALLOWED)
                    .build();
            }
        } catch (e) {
            switch (true) {
                case e.message === 'ENOENT':
                    return new ResponseBuilder()
                        .setStatus(StatusCode.NOT_FOUND)
                        .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                        .setPayload(new BaseError('Requested resource does not exists').getJson())
                        .build();
                default:
                    return new ResponseBuilder()
                        .setStatus(StatusCode.INTERNAL_SERVER_ERROR)
                        .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                        .build();
            }
        }
    }

}
