import {User} from "../domain/user";

export interface UserService {
    createUser(user: User): Promise<User>
    getUser(id: string): Promise<User>
    getAllUsers(): Promise<Iterable<User>>
    deleteUser(id: any): Promise<void>
    updateUser(user: User): Promise<User>
}
