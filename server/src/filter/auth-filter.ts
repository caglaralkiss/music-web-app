import { Filter } from "../core/filter";
import { AppRequest, ContentType, HttpMethod, StatusCode } from "../core/http";
import { ServerResponse } from "http";
import { CrudRepository } from "../repository";
import { User } from "../domain";
import { verify } from "jsonwebtoken";
import { Config } from "../config/config";
import { FilterError } from '../core/error/filter/filter-error';
import { ApiEndpoint } from '../config/api-endpoint';

export class AuthFilter implements Filter {

    private _userRepository: CrudRepository<User, string>;

    constructor({userRepository}: {userRepository: CrudRepository<User, string>}) {
        this._userRepository = userRepository;
    }

    async execute(req: AppRequest, res: ServerResponse): Promise<void> {
        const isRegisterRequest: boolean = req.path === ApiEndpoint.USER && req.method === HttpMethod.POST;

        if (isRegisterRequest) {
            return;
        }

        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const {secret} = Config.getInstance();
            const payload = verify(token, secret);

            if (payload) {
                req.id = (payload as any).id;
                return;
            }
        }

        res.writeHead(StatusCode.UNAUTHORIZED, {'content-type': ContentType.APPLICATION_JSON});
        res.end(JSON.stringify({'Error': 'You are not authorized!'}));
        throw new FilterError()
    }
}
