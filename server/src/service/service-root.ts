import {UserServiceImpl} from "./user-service-impl";
import {SongServiceImpl} from "./song-service-impl";
import RepositoryRoot from '../repository/repository-root'
import { PlaylistServiceImpl } from './playlist-service-impl';

const UserService = new UserServiceImpl({userRepository: RepositoryRoot.UserRepository});
const SongService = new SongServiceImpl({songRepository: RepositoryRoot.SongRepository});
const PlaylistService = new PlaylistServiceImpl({playlistRepository: RepositoryRoot.PlaylistRepository});

export default {
    UserService,
    SongService,
    PlaylistService
}
