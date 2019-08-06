import {SongService} from "./song-service";
import {Song} from "../domain";
import {CrudRepository} from "../repository";
import {SongAlreadyExistsError, SongNotExistsError} from "../core/error/service/song-error";

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

    async updateSong(song: Song): Promise<void> {
        if (await this._songRepository.existsById(song.id)) {
            await this._songRepository.save(song);
        } else {
            throw new SongNotExistsError(`Song ${song.id} does not exists!`);
        }
    }

}
