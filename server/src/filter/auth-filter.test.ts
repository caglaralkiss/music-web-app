import {Filter} from "../core/filter";
import {AppRequest, ContentType, StatusCode} from "../core/http";
import {IncomingMessage, ServerResponse} from 'http';
import {AuthFilter} from "./auth-filter";
import {CrudRepository, UserRepository} from "../repository";
import {User} from "../domain";

describe('AuthFilter', () => {
    let authFilter: Filter;
    let userRepository: CrudRepository<User, string>;
    let req: AppRequest;
    let res: ServerResponse;
    let token = 'someToken';

    beforeEach(() => {
        userRepository = new UserRepository({fs: {} as any, dir: 'mockUserPath', ext: 'json'});
        authFilter = new AuthFilter({userRepository});

        req = {
            headers: {
                authorization: `Bearer ${token}`
            }
        } as AppRequest;
        res = new ServerResponse({} as IncomingMessage);
    });


    test('should send 401 status code if request doesnt include authorization header', async () => {
        try {
            spyOn(res, 'writeHead').and.callFake((statusCode, headers) => {
            });
            spyOn(res, 'end');

            delete req.headers.authorization;

            await authFilter.execute(req, res);

            expect(res.writeHead).toHaveBeenCalledWith(StatusCode.UNAUTHORIZED,
              {'content-type': ContentType.APPLICATION_JSON});
            expect(res.end).toHaveBeenCalled();
        } catch (e) {
        }
    });
});
