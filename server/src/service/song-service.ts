import { Song } from "../domain";
import { Page, PagedResult } from '../util/pagination';

export interface SongService {
    getSongs(params: { page?: Page, search?: string }): Promise<PagedResult<Song>>;

    getSong(id: string): Promise<Song>;

    createSong(song: Song): Promise<void>;

    deleteSong(id: string): Promise<void>;

    updateSong(song: Song): Promise<void>
}
