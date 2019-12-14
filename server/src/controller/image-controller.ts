import { Controller } from '../core/router';
import { AppRequest, ContentType, HttpResponse, ResponseBuilder, StatusCode } from '../core/http';
import { BaseError } from '../core/error';
import { Config } from '../config/config';
import { ApiEndpoint } from '../config/api-endpoint';

export class ImageController implements Controller {
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
      const imagePath = `${Config.getInstance().db}/${ApiEndpoint.IMAGE}/${id}.jpeg`;
      const payload = this._fs.createReadStream(imagePath);

      return new ResponseBuilder()
        .setStatus(StatusCode.OK)
        .setPayload(payload)
        .setHeaders({ 'content-type': ContentType.IMAGE_JPEG })
        .build();
    } catch (e) {
      return this._errorHandler(e);
    }
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
