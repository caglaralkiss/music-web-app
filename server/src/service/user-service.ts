/**
 * Concrete implementation of User specific operations.
 *
 * @author Caglar Alkis
 */

import {CrudRepository} from "../repository/crud-repository";
import {User} from "../domain/user";
import {UserAlreadyExistsError, UserNotExistsError} from "../core/error/service/user-error";

export class UserService {
    private _userRepository: CrudRepository<User, string>;

    constructor({userRepository}: { userRepository: CrudRepository<User, string> }) {
        this._userRepository = userRepository;
    }

    async getUser(id: string): Promise<User> {
        const user: User = await this._userRepository.findById(id);
        delete user.password;

        return user;
    }

    async getAllUsers(): Promise<Iterable<User>> {
        const users: Iterable<User> = await this._userRepository.findAll();

        return Array.from(users).map(user => {
            delete user.password;
            return user;
        });
    }

    async deleteUser(id: string): Promise<void> {
        return await this._userRepository.deleteById(id);
    }

    async updateUser(user: User) {
        if (await this._userRepository.existsById(user.id)) {
            return await this._userRepository.save(user);
        } else {
            throw new UserNotExistsError(`User ${user.email} does not exists!`);
        }
    }

    async createUser(user: User) {
        if (!(await this._userRepository.existsById(user.id))) {
            try {
                return await this._userRepository.save(user);
            } catch (e) {
                throw e;
            }
        } else {
            throw new UserAlreadyExistsError(`User ${user.email} already exists!`);
        }
    }
}
