import {UserService} from "./user-service";
import {UserRepository} from "../repository/user-repository";
import {User} from "../domain/user";
import {UserAlreadyExistsError, UserNotExistsError} from "../core/error/service/user-error";

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository = new UserRepository({fs: {}, ext: '', dir: ''});

    beforeEach(() => {
        userService = new UserService({userRepository: userRepository});
    });

    test('should get user without password returned', async () => {
        const user: User = {
            id: '12345',
            name: 'caglar',
            surname: 'alkis',
            email: 'somemail@mailll.com',
            password: 'somePass'
        };
        const {password, ...userWithoutPassword} = user;
        spyOn(userRepository, 'findById').and.returnValue(Promise.resolve(user));

        const userFromResponse = await userService.getUser(user.id);

        expect(userFromResponse).toEqual(userWithoutPassword);
    });

    test('should get all users from DB with password omitted', async () => {
        const user: User = {
            id: '12345',
            name: 'caglar',
            surname: 'alkis',
            email: 'somemail@mailll.com',
            password: 'somePass'
        };
        const userArray: Array<User> = [{...user, id: '1'}, {...user, id: '2'}, {...user, id: '3'}];
        const userArrayPasswordOmitted = userArray.map((item) => {
            const {password, ...userWithoutPassword} = item;
            return userWithoutPassword;
        });

        spyOn(userRepository, 'findAll').and.returnValue(Promise.resolve(userArray));
        const fetchedUsers: Iterable<User> = await userService.getAllUsers();

        expect(fetchedUsers).toEqual(userArrayPasswordOmitted);
    });

    test('should delete user with given id', async () => {
        spyOn(userRepository, 'deleteById');
        const id = '1465136';

        await userService.deleteUser(id);
        expect(userRepository.deleteById).toHaveBeenCalledWith(id);
    });

    test('should update user when there is a specified user', async () => {
        const user: User = {id: '1'} as User;

        spyOn(userRepository, 'existsById').and.returnValue(Promise.resolve(true));
        spyOn(userRepository, 'save');

        await userService.updateUser(user);

        expect(userRepository.existsById).toHaveBeenCalledWith(user.id);
        expect(userRepository.save).toHaveBeenCalledWith(user);
    });

    test('should throw UserNotExists error when approach to update non-exist user', async () => {
        spyOn(userRepository, 'existsById').and.returnValue(Promise.resolve(false));

        try {
            await userService.updateUser({} as User);
        } catch (e) {
            expect(e).toBeInstanceOf(UserNotExistsError)
        }
    });

    test('should save user', async () => {
       const user: User = {id: '1'} as User;

        spyOn(userRepository, 'existsById').and.returnValue(Promise.resolve(false));
        spyOn(userRepository, 'save');

        await userService.createUser(user);

        expect(userRepository.existsById).toHaveBeenCalledWith(user.id);
        expect(userRepository.save).toHaveBeenCalledWith(user);
    });


    test('should throw UserAlreadyExists error when approach to save already existed user', async () => {
        spyOn(userRepository, 'existsById').and.returnValue(Promise.resolve(true));

        try {
            await userService.createUser({} as User);
        } catch (e) {
            expect(e).toBeInstanceOf(UserAlreadyExistsError);
        }
    });
});
