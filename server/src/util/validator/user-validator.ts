/**
 * Defines 'User' model specific validate functions.
 *
 * @author Caglar Alkis
 */

import {User} from "../../domain/user";
import {BaseValidator} from "./base-validator";

export class UserValidator {
    static validateName(firstOrLastName: string): boolean {
        return BaseValidator.type(firstOrLastName, 'string');
    }

    static validateMail(mail: string) {
        return BaseValidator.pattern(mail, BaseValidator.MAIL_PATTERN);
    }

    /**
     * Password should be minimum of 8 characters and include 1 lower, 1 upper character inside of it.
     * @param password
     */
    static validatePassword(password: string) {
        return BaseValidator.pattern(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    }

    static validateUser(user: User) {
        return this.validateMail(user.email) &&
            this.validatePassword(user.password) &&
            this.validateName(user.name) &&
            this.validateName(user.surname);
    }
}
