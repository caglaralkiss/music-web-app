import { SongService } from "./song-service";
import { Song } from "../domain";
import { CrudRepository } from "../repository";
import { SongAlreadyExistsError, SongNotExistsError } from "../core/error/service/song-error";
import { Page, PagedResult } from '../util/pagination';
import getPagedResult from '../util/pagination/paginator';

export class SongServiceImpl implements SongService {
    private _songRepository: CrudRepository<Song, string>;

    constructor({songRepository}: { songRepository: CrudRepository<Song, string> }) {
        this._songRepository = songRepository;
    }

    async createSong(song: Song): Promise<void> {
        if (!(await this._songRepository.existsById(song.id))) {
            try {
                await this._songRepository.save(song);
            } catch (e) {
                throw e;
            }
        } else {
            throw new SongAlreadyExistsError(`Song ${song.id} already exists!`);
        }
    }

    async deleteSong(id: string): Promise<void> {
        await this._songRepository.deleteById(id);
    }

    async getSong(id: string): Promise<Song> {
        return await this._songRepository.findById(id);
    }

    async getSongs(params: { search?: string, page: Page}): Promise<PagedResult<Song>> {
        const { search, page } = params

        const songs = Array.from<Song>(await this._songRepository.findAll())

        if (!search) {
            return getPagedResult<Song>(songs, page)
        }

        const searchedSongs = songs.filter(song => song.title.includes(search))
        return getPagedResult<Song>(searchedSongs, page)
    }

    async updateSong(song: Song): Promise<void> {
        if (await this._songRepository.existsById(song.id)) {
            await this._songRepository.save(song);
        } else {
            throw new SongNotExistsError(`Song ${song.id} does not exists!`);
        }
    }

}
