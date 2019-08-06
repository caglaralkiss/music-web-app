import {Controller, Route} from "../core/router";
import {AppRequest, ContentType, HttpMethod, HttpResponse, ResponseBuilder, StatusCode} from "../core/http";
import {ServerResponse} from "http";
import {Filter} from "../core/filter";
import {BaseError} from "../core/error";
import {Config} from "../config/config";

export class AudioRoute extends Route {
    private _fs: any;

    constructor({path, controller, filters, fs}:
                    { path: string, controller: Controller, filters: Array<Filter>, fs: any }) {
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
                const audioPath = `${Config.getInstance().db}/audio/${id}.mp3`;
                const {size} = await this._fs.stat(audioPath);

                const range = req.headers.range;

                return this._getStreamResponse(range, audioPath, size);
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

    private _getStreamResponse(range: string, audioPath: string, size: number): HttpResponse {
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');

            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : size - 1;

            const chunkSize = (end - start) + 1;

            const audioStream = this._fs.createReadStream(audioPath, {start, end});

            return new ResponseBuilder()
                .setHeaders({
                    'Content-Range': `bytes ${start}-${end}/${size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'content-type': ContentType.AUDIO_MPEG,
                })
                .setStatus(StatusCode.PARTIAL_CONTENT)
                .setPayload(audioStream)
                .build();
        } else {
            const audioStream = this._fs.createReadStream(audioPath);
            return new ResponseBuilder()
                .setStatus(StatusCode.OK)
                .setHeaders({
                    'content-type': ContentType.AUDIO_MPEG,
                    'Content-Length': size,
                })
                .setPayload(audioStream)
                .build();
        }
    }
}
