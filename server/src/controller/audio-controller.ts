import { Controller } from '../core/router';
import { AppRequest, ContentType, HttpResponse, ResponseBuilder, StatusCode } from '../core/http';
import { BaseError } from '../core/error';
import { Config } from '../config/config';

export class AudioController implements Controller {
  private _fs: any;

  constructor({ fs }: { fs: any }) {
    this._fs = fs;
  }

  async get(req: AppRequest): Promise<HttpResponse> {
    try {
      const { id } = req.queryStringObj;

      if (!id) {
        return this.missingIdResponse()
      }

      const audioPath = `${Config.getInstance().db}/audio/${id}.mp3`;
      const {size} = await this._fs.stat(audioPath);
      const range = req.headers.range;

      return this.getStreamResponse(range, audioPath, size);
    } catch (e) {
      return this._errorHandler(e);
    }
  }

  getStreamResponse(range: string, audioPath: string, size: number): HttpResponse {
    if (range) {
      return this.getRangedStream(range, audioPath, size)
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

  private getRangedStream(range: string, audioPath: string, size: number) {
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
  }

  private missingIdResponse() {
    return new ResponseBuilder()
      .setStatus(StatusCode.BAD_REQUEST)
      .setHeaders({ 'content-type': ContentType.APPLICATION_JSON })
      .setPayload(new BaseError('Id of file is missing').getJson())
      .build();
  }

  private _errorHandler(e: BaseError): HttpResponse {
    console.log(e);
    switch (true) {
      case e.message === 'ENOENT':
        return new ResponseBuilder()
          .setStatus(StatusCode.NOT_FOUND)
          .setHeaders({ 'content-type': ContentType.APPLICATION_JSON })
          .setPayload(new BaseError('Requested resource does not exists').getJson())
          .build();
      default:
        return new ResponseBuilder()
          .setStatus(StatusCode.INTERNAL_SERVER_ERROR)
          .setHeaders({ 'content-type': ContentType.APPLICATION_JSON })
          .build();
    }
  }
}
