import {Controller} from "../core/router";
import {AppRequest, HttpResponse, ResponseBuilder, StatusCode} from "../core/http";
import {User} from "../domain";
import {BaseError, EntityNotExistsError, UserAlreadyExistsError, UserNotExistsError} from "../core/error";
import {UserService} from "../service";

export class UserController implements Controller {
    private _userService: UserService;

    constructor({userService}: { userService: UserService }) {
        this._userService = userService;
    }

    async get(req: AppRequest): Promise<HttpResponse<Iterable<User> | User>> {
        try {
            const {id} = req.queryStringObj;

            let payload: Iterable<User> | User;
            payload = id ? await this._userService.getUser(id) : await this._userService.getAllUsers();

            return new ResponseBuilder<Iterable<User> | User>()
                .setStatus(StatusCode.OK)
                .setPayload(payload)
                .build();
        } catch (e) {
            return this._errorHandler(e);
        }
    }

    async delete(req: AppRequest): Promise<HttpResponse<any>> {
        try {
            const {id} = req.queryStringObj;
            this._checkAuthority(req, id);

            await this._userService.deleteUser(id);

            return new ResponseBuilder().setStatus(StatusCode.OK).build();
        } catch (e) {
            return this._errorHandler(e);
        }
    }

    async post(req: AppRequest): Promise<HttpResponse<any>> {
        try {
            const {name, surname, password, email} = req.body;
            const user: User = {
                id: email,
                email,
                name,
                surname,
                password
            };
            await this._userService.createUser(user);

            return new ResponseBuilder().setStatus(StatusCode.OK).build();
        } catch (e) {
            return this._errorHandler(e);
        }
    }

    async put(req: AppRequest): Promise<HttpResponse<any>> {
        try {
            // @TODO add hashing logic in here
            const {name, surname, password, email} = req.body;
            this._checkAuthority(req, email);

            const existedUser = await this._userService.getUser(email);

            const modifiedUser = {
                id: existedUser.id,
                name: name ? name : existedUser.name,
                surname: surname ? surname : existedUser.surname,
                password: password ? password : existedUser.password,
                email: existedUser.email
            };

            await this._userService.updateUser(modifiedUser);

            return new ResponseBuilder().setStatus(StatusCode.OK).build();
        } catch (e) {
            return this._errorHandler(e);
        }
    }

    private _errorHandler(e: BaseError): HttpResponse {
        console.log(e);
        switch (true) {
            case e instanceof EntityNotExistsError:
                return new ResponseBuilder().setStatus(StatusCode.NOT_FOUND).setPayload(e.getJson()).build();
            case e instanceof UserAlreadyExistsError:
                return new ResponseBuilder().setStatus(StatusCode.BAD_REQUEST).setPayload(e.getJson()).build();
            case e instanceof UserNotExistsError:
                return new ResponseBuilder().setStatus(StatusCode.BAD_REQUEST).setPayload(e.getJson()).build();
            default:
                return new ResponseBuilder<any>().setStatus(StatusCode.INTERNAL_SERVER_ERROR)
                    .setPayload((new BaseError('Undefined error occurred').getJson()))
                    .build();
        }
    }

    private _checkAuthority(req: AppRequest, id: string) {
        if (req.id !== id) {
            return new ResponseBuilder()
                .setStatus(StatusCode.FORBIDDEN)
                .setPayload(new BaseError('You are not authorized to delete this user').getJson())
                .build();
        }
    }
}
