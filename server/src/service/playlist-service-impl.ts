import { PlaylistService } from './playlist-service';
import { Playlist } from '../domain';
import { Page, PagedResult } from '../util/pagination';
import { CrudRepository } from '../repository';
import { PlaylistRepository } from '../repository/playlist-repository';
import getPagedResult from '../util/pagination/paginator';
import { PlaylistAlreadyExistsError, PlaylistNotExistsError } from '../core/error/service/playlist-error';

export class PlaylistServiceImpl implements PlaylistService {
  private _playlistRepository: CrudRepository<Playlist, string>;

  constructor({ playlistRepository }: { playlistRepository: PlaylistRepository }) {
    this._playlistRepository = playlistRepository;
  }

  async createPlaylist(playlist: Playlist): Promise<void> {
    if (!(await this._playlistRepository.existsById(playlist.id))) {
      try {
        await this._playlistRepository.save(playlist);
      } catch (e) {
        throw e;
      }
    } else {
      throw new PlaylistAlreadyExistsError(`Playlist ${playlist.id} already exists!`);
    }
  }

  async deletePlaylist(id: string): Promise<void> {
    await this._playlistRepository.deleteById(id);
  }

  async getPlaylist(id: string): Promise<Playlist> {
    return this._playlistRepository.findById(id)
  }

  async getPlaylists(params: { page?: Page; search?: string }): Promise<PagedResult<Playlist>> {
    const { search, page } = params

    const playlists = Array.from<Playlist>(await this._playlistRepository.findAll())

    if (!search) {
      return getPagedResult<Playlist>(playlists, page)
    }

    const searchedPlaylists = playlists.filter(playlist => playlist.name.includes(search))
    return getPagedResult<Playlist>(searchedPlaylists, page)
  }

  async updatePlaylist(playlist: Playlist): Promise<void> {
    if (await this._playlistRepository.existsById(playlist.id)) {
      await this._playlistRepository.save(playlist);
    } else {
      throw new PlaylistNotExistsError(`Playlist ${playlist.id} does not exists!`);
    }
  }

}
