/**
 * User model of the project.
 *
 * @author Caglar Alkis
 */
import {BaseEntity} from "./base-entity";

export interface User extends BaseEntity<string> {
    name: string;
    surname: string;
    email: string;
    password: string
}
