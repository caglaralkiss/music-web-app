import {Controller} from "../core/router";
import {AppRequest, ContentType, HttpResponse, ResponseBuilder, StatusCode} from "../core/http";
import {Song} from "../domain";
import {BaseError, EntityNotExistsError} from "../core/error";
import {Config} from "../config/config";
import {ApiEndpoint} from "../config/api-endpoint";
import {Crypto} from "../util/security/crypto";
import {SongService} from "../service";
import {SongAlreadyExistsError, SongNotExistsError} from "../core/error/service/song-error";

export class SongController implements Controller {
    private _songService: SongService;
    private _fs: any;
    private readonly BASE_DIR: string = Config.getInstance().db;
    private readonly URL: string = Config.getInstance().url;

    constructor({fs, songService}: { fs: any, songService: SongService }) {
        this._songService = songService;
        this._fs = fs;
    }

    async get(req: AppRequest): Promise<HttpResponse<Song>> {
        try {
            const {id} = req.queryStringObj;

            const song = await this._songService.getSong(id);

            return new ResponseBuilder<Song>()
                .setStatus(StatusCode.OK)
                .setPayload(song)
                .build();
        } catch (e) {
            return this._errorHandler(e);
        }
    }

    async post(req: AppRequest): Promise<HttpResponse> {
        try {
            const {files, fields} = req.body;

            if (files && fields) {
                const {title, album, artist} = fields;
                const {cover, audio} = files;

                const id = Crypto.generateId();
                this._readToWriteStream(cover.path, `${this.BASE_DIR}${ApiEndpoint.IMAGE}/${id}.jpeg`);
                this._readToWriteStream(audio.path, `${this.BASE_DIR}${ApiEndpoint.AUDIO}/${id}.mp3`);

                const song: Song = {
                    id,
                    title: title as string,
                    album: album as string,
                    artist,
                    cover: `${this.URL}/${ApiEndpoint.IMAGE}?id=${id}`,
                    audio: `${this.URL}/${ApiEndpoint.AUDIO}?id=${id}`,
                    owner: req.id
                };
                await this._songService.createSong(song);

                return new ResponseBuilder().setStatus(StatusCode.OK).build()
            } else {
                return new ResponseBuilder()
                    .setHeaders({'content-type': ContentType.APPLICATION_JSON})
                    .setPayload(new BaseError('Missing fields in request').getJson())
                    .setStatus(StatusCode.BAD_REQUEST)
                    .build()
            }
        } catch (e) {
            return this._errorHandler(e);
        }
    }

    async delete(req: AppRequest): Promise<HttpResponse> {
        try {
            const {id} = req.queryStringObj;
            await this._songService.deleteSong(id);

            return new ResponseBuilder().setStatus(StatusCode.OK).build();
        } catch (e) {
            return this._errorHandler(e);
        }
    }

    async put(req: AppRequest): Promise<HttpResponse> {
        try {
            const {files, fields} = req.body;
            const {id, title, album, artist} = fields;
            const {cover, audio} = files;

            const song: Song = await this._songService.getSong(id);

            if (id) {
                if (cover) {
                    this._readToWriteStream(cover.path, `${this.BASE_DIR}${ApiEndpoint.IMAGE}/${id}.jpeg`);
                }
                if (audio) {
                    this._readToWriteStream(cover.path, `${this.BASE_DIR}${ApiEndpoint.IMAGE}/${id}.jpeg`)
                }

                const newSong: Song = {
                    ...song,
                    title: title ? title : song.title,
                    album: album ? album : song.album,
                    artist: artist ? artist : song.artist
                };

                await this._songService.updateSong(newSong);

                return new ResponseBuilder().setStatus(StatusCode.OK).build();
            } else {
                return new ResponseBuilder()
                    .setStatus(StatusCode.BAD_REQUEST)
                    .setPayload(new BaseError('Song id is missing').getJson())
                    .build();
            }
        } catch (e) {
            return this._errorHandler(e);
        }
    }

    private _errorHandler(e: BaseError): HttpResponse {
        console.log(e);
        switch (true) {
            case e instanceof EntityNotExistsError:
                return new ResponseBuilder().setStatus(StatusCode.NOT_FOUND).setPayload(e.getJson()).build();
            case e instanceof SongAlreadyExistsError:
                return new ResponseBuilder().setStatus(StatusCode.BAD_REQUEST).setPayload(e.getJson()).build();
            case e instanceof SongNotExistsError:
                return new ResponseBuilder().setStatus(StatusCode.BAD_REQUEST).setPayload(e.getJson()).build();
            default:
                return new ResponseBuilder<any>().setStatus(StatusCode.INTERNAL_SERVER_ERROR)
                    .setPayload((new BaseError('Undefined error occurred').getJson()))
                    .build();
        }
    }

    private _readToWriteStream(readPath: string, writePath: string): void {
        const read$ = this._fs.createReadStream(readPath);
        const write$ = this._fs.createWriteStream(writePath);
        read$.pipe(write$);
    }
}
