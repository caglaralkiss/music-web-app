import { Controller } from '../core/router';
import { PlaylistService } from '../service';
import { AppRequest, HttpResponse, ResponseBuilder, StatusCode } from '../core/http';
import { Playlist } from '../domain';
import { Page, PagedResult } from '../util/pagination';
import { Crypto } from '../util/security/crypto';
import { BaseError, EntityNotExistsError } from '../core/error';
import { PlaylistAlreadyExistsError, PlaylistNotExistsError } from '../core/error/service/playlist-error';

export class PlaylistController implements Controller {
  private _playlistService: PlaylistService;

  constructor({ playlistService }: { fs: any, playlistService: PlaylistService }) {
    this._playlistService = playlistService;
  }

  async get(req: AppRequest): Promise<HttpResponse<Playlist | PagedResult<Playlist>>> {
    try {
      const { id, pageNum, offset, search } = req.queryStringObj;

      return id ? this.getSinglePlaylist(id) : this.getPlaylists(pageNum, offset, search);

    } catch (e) {
      return this._errorHandler(e);
    }
  }

  async getSinglePlaylist(id: string) {
    const playlist = await this._playlistService.getPlaylist(id);

    return new ResponseBuilder<Playlist>()
      .setStatus(StatusCode.OK)
      .setPayload(playlist)
      .build();
  }

  async getPlaylists(pageNum: number, offset: number, search: string) {
    const page: Page = {
      pageNum: Number(pageNum),
      offset: Number(offset)
    };

    const playlists = await this._playlistService.getPlaylists({ page, search });

    return new ResponseBuilder<PagedResult<Playlist>>()
      .setStatus(StatusCode.OK)
      .setPayload(playlists)
      .build();
  }

  async post(req: AppRequest): Promise<HttpResponse> {
    try {
      const { name, owner, songs } = req.body;

      const playlist: Playlist = {
        id: Crypto.generateId(),
        name,
        owner,
        songs,
        creationDate: Date.now()
      }

      await this._playlistService.createPlaylist(playlist)

      return new ResponseBuilder()
        .setStatus(StatusCode.OK)
        .build()
    } catch (e) {
      return this._errorHandler(e);
    }
  }

  async delete(req: AppRequest): Promise<HttpResponse> {
    try {
      const { id } = req.queryStringObj;
      await this._playlistService.deletePlaylist(id);

      return new ResponseBuilder().setStatus(StatusCode.OK).build();
    } catch (e) {
      return this._errorHandler(e);
    }
  }

  async put(req: AppRequest): Promise<HttpResponse> {
    try {
      const { id, name, songs } = req.body;

      const playlist: Playlist = await this._playlistService.getPlaylist(id);

      if (id) {
        const newPlaylist: Playlist = {
          ...playlist,
          name: name ? name : playlist.name,
          songs: songs ? songs : playlist.songs
        };

        await this._playlistService.updatePlaylist(newPlaylist);

        return new ResponseBuilder().setStatus(StatusCode.OK).build();
      } else {
        return new ResponseBuilder()
          .setStatus(StatusCode.BAD_REQUEST)
          .setPayload(new BaseError('Playlist id is missing').getJson())
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
      case e instanceof PlaylistAlreadyExistsError:
        return new ResponseBuilder().setStatus(StatusCode.BAD_REQUEST).setPayload(e.getJson()).build();
      case e instanceof PlaylistNotExistsError:
        return new ResponseBuilder().setStatus(StatusCode.BAD_REQUEST).setPayload(e.getJson()).build();
      default:
        return new ResponseBuilder<any>().setStatus(StatusCode.INTERNAL_SERVER_ERROR)
          .setPayload((new BaseError('Undefined error occurred').getJson()))
          .build();
    }
  }
}
