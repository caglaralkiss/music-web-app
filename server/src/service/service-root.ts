import {UserServiceImpl} from "./user-service-impl";
import {SongServiceImpl} from "./song-service-impl";
import RepositoryRoot from '../repository/repository-root'

const UserService = new UserServiceImpl({userRepository: RepositoryRoot.UserRepository});
const SongService = new SongServiceImpl({songRepository: RepositoryRoot.SongRepository});

export default {
    UserService,
    SongService
}
