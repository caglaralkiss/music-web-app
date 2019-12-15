import { UserController, SongController, AuthController, PlaylistController } from "./";
import ServiceRoot from "../service/service-root"
import RepositoryRoot from "../repository/repository-root"
import fs from "../util/promisified/fs";
import { ImageController } from './image-controller';
import { AudioController } from './audio-controller';

const userController = new UserController({userService: ServiceRoot.UserService});
const authController = new AuthController({userRepository: RepositoryRoot.UserRepository});
const songController = new SongController({fs, songService: ServiceRoot.SongService});
const playlistController = new PlaylistController({fs, playlistService: ServiceRoot.PlaylistService});
const imageController = new ImageController({ fs });
const audioController = new AudioController({ fs });

export default {
    UserController: userController,
    AuthController: authController,
    SongController: songController,
    ImageController: imageController,
    AudioController: audioController,
    PlaylistController: playlistController,
}
