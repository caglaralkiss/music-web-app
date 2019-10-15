import {AuthFilter, CorsFilter, LoggingFilter} from "../filter";
import {AudioRoute, AuthRoute, ImageRoute, PingRoute, SongRoute, UserRoute} from "./";
import {Controller} from "../core/router";
import fs from "../util/promisified/fs";
import {ApiEndpoint} from "../config/api-endpoint";
import ControllerRoot from "../controller/controller-root";
import RepositoryRoot from "../repository/repository-root";

const authRoute = new AuthRoute({
    path: ApiEndpoint.AUTH,
    controller: ControllerRoot.AuthController,
    filters: [
        new LoggingFilter(),
        new CorsFilter()
    ]
});

const songRoute = new SongRoute({
    path: ApiEndpoint.SONG,
    controller: ControllerRoot.SongController,
    filters: [
        new CorsFilter()
    ]
});

const userRoute = new UserRoute({
    path: ApiEndpoint.USER,
    controller: ControllerRoot.UserController,
    filters: [new CorsFilter(), new AuthFilter({userRepository: RepositoryRoot.UserRepository}), new LoggingFilter()]
});

const imgRoute = new ImageRoute({path: ApiEndpoint.IMAGE, controller: {} as Controller, filters: [new CorsFilter()], fs});
const pingRoute = new PingRoute({path: 'ping', controller: {} as Controller, filters: []});
const audioRoute = new AudioRoute({path: ApiEndpoint.AUDIO, controller: {} as Controller, filters: [new CorsFilter()], fs});

export default {
    UserRoute: userRoute,
    AuthRoute: authRoute,
    SongRoute: songRoute,
    AudioRoute: audioRoute,
    ImageRoute: imgRoute,
    PingRoute: pingRoute
};
