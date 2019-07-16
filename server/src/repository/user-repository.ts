/**
 * Implementation of File Repository.
 * Aims to operate CRUD operations on file-system as User objects.
 *
 * @author Caglar Alkis
 */

import {FileRepository} from "./file-repository";
import {User} from "../domain/user";

export class UserRepository extends FileRepository<User, string> {
}
