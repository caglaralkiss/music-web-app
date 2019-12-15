import { Page, PagedResult } from '../util/pagination';
import { Playlist } from '../domain';

export interface PlaylistService {
  getPlaylists(params: { page?: Page, search?: string }): Promise<PagedResult<Playlist>>;

  getPlaylist(id: string): Promise<Playlist>;

  createPlaylist(playlist: Playlist): Promise<void>;

  deletePlaylist(id: string): Promise<void>;

  updatePlaylist(playlist: Playlist): Promise<void>
}
