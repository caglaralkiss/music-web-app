import {UserController, SongController, AuthController} from "./";
import ServiceRoot from "../service/service-root"
import RepositoryRoot from "../repository/repository-root"
import fs from "../util/promisified/fs";

const userController = new UserController({userService: ServiceRoot.UserService});
const authController = new AuthController({userRepository: RepositoryRoot.UserRepository});
const songController = new SongController({fs, songService: ServiceRoot.SongService});

export default {
    UserController: userController,
    AuthController: authController,
    SongController: songController
}
