import {UserService} from "../service";
import {User} from "../domain";
import {UserController} from "./user-controller";
import {AppRequest} from "../core/http";
import {UserAlreadyExistsError, UserNotExistsError} from "../core/error";
import {Crypto} from "../util/security/crypto";

describe('UserController', () => {
    const mockAppRequestFactory: (partialReq: Partial<AppRequest>) => AppRequest = (partialReq) => {
        return {
            path: partialReq.path || null,
            headers: partialReq.headers || null,
            method: partialReq.method || null,
            queryStringObj: partialReq.queryStringObj || {},
            body: partialReq || {}
        }
    };

    class MockUserService implements UserService {
        async createUser(user: User): Promise<User> {
            return;
        }

        deleteUser(id: any): Promise<void> {
            return undefined;
        }

        getAllUsers(): Promise<Iterable<User>> {
            return undefined;
        }

        getUser(id: string): Promise<User> {
            return undefined;
        }

        updateUser(user: User): Promise<User> {
            return undefined;
        }
    }

    let userService: UserService = new MockUserService();
    let userController: UserController = new UserController({userService});

    beforeEach(() => {
        spyOn(Crypto, 'hash').and.returnValue(undefined);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should get the user when email is specified', async () => {
        spyOn(userService, 'getUser');
        const appRequest: AppRequest =
            mockAppRequestFactory({queryStringObj: {id: 'caglaralkis@gmail.com'}});

        await userController.get(appRequest);
        expect(userService.getUser).toHaveBeenCalledWith(appRequest.queryStringObj.id);
    });

    test('should get all users when queryStringObj is empty', async () => {
        spyOn(userService, 'getAllUsers');
        const appRequest: AppRequest = mockAppRequestFactory({});

        await userController.get(appRequest);
        expect(userService.getAllUsers).toHaveBeenCalled();
    });

    test('should save user', async () => {
        spyOn(userService, 'createUser');
        const user: User = {} as User;
        const appRequest: AppRequest = mockAppRequestFactory({body: user});

        await userController.post(appRequest);
        expect(userService.createUser).toHaveBeenCalledWith(user);
    });

    test('should throw error when same user is already registered to system', async () => {
        spyOn(userService, 'createUser').and.returnValue(Promise.reject(new UserAlreadyExistsError('')));

        const user: User = {} as User;
        const appRequest: AppRequest = mockAppRequestFactory({body: user});

        try {
            await userController.post(appRequest);
        } catch (e) {
            expect(e).toBeInstanceOf(UserAlreadyExistsError);
        }
    });

    test('should delete user', async () => {
        spyOn(userService, 'deleteUser');

        const id: string = '12345';
        const appRequest: AppRequest = mockAppRequestFactory({queryStringObj: {id}});

        await userController.delete(appRequest);
        expect(userService.deleteUser).toHaveBeenCalledWith(id);
    });

    test('should throw error when id does not exists on DB', async () => {
        spyOn(userService, 'deleteUser').and.returnValue(Promise.reject(new UserNotExistsError('')));

        const id: string = '12345';
        const appRequest: AppRequest = mockAppRequestFactory({queryStringObj: {id}});

        try {
            await userController.delete(appRequest);
        } catch (e) {
            expect(userService.deleteUser).toHaveBeenCalledWith(id);
            expect(e).toBeInstanceOf(UserNotExistsError);
        }
    });
});
