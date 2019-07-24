/**
 * Security class of the project.
 *
 * @author Caglar Alkis
 */

import crypto from 'crypto';
import {Config} from "../../config/config";

export class Crypto {

    /**
     * Hash algorithm based on sha256 algorithm.
     * It uses core crypto module of core NodeJS.
     *
     * @param value - value to be hashed.
     */
    static hash(value: string): string {
        if (value.length > 0) {
            const {hashSalt} = Config.getInstance();

            return crypto.createHmac('sha256', hashSalt).update(value).digest('hex');
        }
    }

    static generateId(): string {
        return crypto.randomBytes(16).toString('hex');
    }
}
