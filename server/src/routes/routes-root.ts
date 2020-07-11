import { AuthFilter, CorsFilter, LoggingFilter, UserFilter } from "../filter";
import { Controller } from "../core/router";
import { ApiEndpoint } from "../config/api-endpoint";
import ControllerRoot from "../controller/controller-root";
import RepositoryRoot from "../repository/repository-root";
import { Route } from '../core/router';
import { PingRoute } from './ping-route';

const authRoute = new Route({
    path: ApiEndpoint.AUTH,
    controller: ControllerRoot.AuthController,
    filters: [
        new LoggingFilter(),
        new CorsFilter()
    ]
});

const songRoute = new Route({
    path: ApiEndpoint.SONG,
    controller: ControllerRoot.SongController,
    filters: [
        new CorsFilter(),
        new AuthFilter({ userRepository: RepositoryRoot.UserRepository }),
    ]
});

const userRoute = new Route({
    path: ApiEndpoint.USER,
    controller: ControllerRoot.UserController,
    filters: [
        new CorsFilter(),
        new UserFilter(),
        new AuthFilter({userRepository: RepositoryRoot.UserRepository}),
        new LoggingFilter()
    ]
});

const imgRoute = new Route({
    path: ApiEndpoint.IMAGE,
    controller: ControllerRoot.ImageController,
    filters: [new CorsFilter()]});

const audioRoute = new Route({
    path: ApiEndpoint.AUDIO,
    controller: ControllerRoot.AudioController,
    filters: [new CorsFilter()]
});

const playlistRoute = new Route({
    path: ApiEndpoint.PLAYLIST,
    controller: ControllerRoot.PlaylistController,
    filters: [
      new AuthFilter({ userRepository: RepositoryRoot.UserRepository }),
      new CorsFilter(),
    ]
})

const pingRoute = new PingRoute({path: 'ping', controller: {} as Controller, filters: []});

export default {
    UserRoute: userRoute,
    AuthRoute: authRoute,
    SongRoute: songRoute,
    AudioRoute: audioRoute,
    ImageRoute: imgRoute,
    PingRoute: pingRoute,
    PlaylistRoute: playlistRoute
};
