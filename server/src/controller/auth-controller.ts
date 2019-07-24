import {Controller} from "../core/router";
import {AppRequest, HttpResponse, ResponseBuilder, StatusCode} from "../core/http";
import {BaseError, EntityNotExistsError} from "../core/error";
import {CrudRepository} from "../repository";
import {User} from "../domain";
import {sign} from "jsonwebtoken";
import {Crypto} from "../util/security/crypto";
import {Config} from "../config/config";

export class AuthController implements Controller {

    private _userRepository: CrudRepository<User, string>;

    constructor({userRepository}: { userRepository: CrudRepository<User, string> }) {
        this._userRepository = userRepository;
    }

    async post(req: AppRequest): Promise<HttpResponse> {
        try {
            const {email, password} = req.body;

            const hashedPass = Crypto.hash(password);

            const user: User = await this._userRepository.findById(email);

            if (user.password === hashedPass) {
                const {secret} = Config.getInstance();
                const token = sign({id: user.email}, secret);

                return new ResponseBuilder().setStatus(StatusCode.OK).setPayload({token}).build();
            } else {
                return new ResponseBuilder()
                    .setStatus(StatusCode.UNAUTHORIZED)
                    .setPayload(new BaseError('Wrong password').getJson())
                    .build();
            }
        } catch (e) {
            console.log(e);
            switch (e) {
                case EntityNotExistsError:
                    const err = new BaseError(`User with ${req.body.email} does not exists`);
                    return new ResponseBuilder()
                        .setStatus(StatusCode.BAD_REQUEST)
                        .setPayload(err.getJson())
                        .build();
                default:
                    return new ResponseBuilder()
                        .setStatus(StatusCode.INTERNAL_SERVER_ERROR)
                        .setPayload(new BaseError('Undefined error on login').getJson())
                        .build();
            }
        }
    }
}
