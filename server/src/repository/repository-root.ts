import {UserRepository, SongRepository} from "./";
import fs from "../util/promisified/fs";
import {ApiEndpoint} from "../config/api-endpoint";
import { PlaylistRepository } from './playlist-repository';

const userRepository = new UserRepository({fs, dir: 'user', ext: 'json'});
const songRepository = new SongRepository({fs, dir: ApiEndpoint.SONG, ext: 'json'});
const playlistRepository = new PlaylistRepository({fs, dir: ApiEndpoint.PLAYLIST, ext: 'json'});

export default {
    UserRepository: userRepository,
    SongRepository: songRepository,
    PlaylistRepository: playlistRepository
}
