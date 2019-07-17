/**
 * Defines base validators of the project.
 *
 * @author Caglar Alkis
 */

export type Primitive = string | symbol | number | boolean | null | undefined;

export class BaseValidator {
    /** Mail regex of RFC 2822 standard. */
    // @ts-ignore
    static MAIL_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    /**
     * Check the length of the value.
     *
     * If no args is provided, function checks whether given value is greater than 0.
     * If one argument is provided, it checks whether given value is greater than provided argument.
     * If two args are provided, it checks whether given value is between the two provided argument.
     *
     * @param value
     * @param args
     */
    static fieldLength(value: string, ...args: Array<number>) {
        const trimmedValue = value.trim();

        if (args.length === 0) {
            return trimmedValue.length > 0;
        } else if (args.length === 1) {
            return trimmedValue.length > args[0];
        } else {
            return (trimmedValue.length > args[0]) && (trimmedValue.length < args[1]);
        }
    }

    /**
     * Checks the type of a primitive.
     *
     * @param value
     * @param type
     */
    static type(value: Primitive, type: Primitive) {
        return typeof value === type;
    }

    /**
     * Checks the pattern of the given value.
     *
     * @param value string
     * @param regex RegExp
     * @returns {*} boolean
     */
    static pattern(value: string, regex: RegExp) {
        return regex.test(value.trim());
    }
}
