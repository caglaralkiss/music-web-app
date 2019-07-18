import {User} from "../domain";

export interface UserService {
    createUser(user: User): Promise<User>
    getUser(id: string): Promise<User>
    getAllUsers(): Promise<Iterable<User>>
    deleteUser(id: any): Promise<void>
    updateUser(user: User): Promise<User>
}
