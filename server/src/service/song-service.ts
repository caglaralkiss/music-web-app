import {Song} from "../domain";

export interface SongService {
    getSong(id: string): Promise<Song>;

    createSong(song: Song): Promise<void>;

    deleteSong(id: string): Promise<void>;

    updateSong(song: Song): Promise<void>
}
