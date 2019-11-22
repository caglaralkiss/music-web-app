import {Filter} from "../core/filter";
import {AppRequest, ContentType, HttpMethod, StatusCode} from "../core/http";
import {ServerResponse} from "http";
import {BaseError} from "../core/error";
import {User} from "../domain";
import {UserValidator} from "../util/validator";
import { FilterError } from '../core/error/filter/filter-error';

export class UserFilter implements Filter {
    async execute(req: AppRequest, res: ServerResponse): Promise<void> {
        const {method, body, queryStringObj} = req;
        let error: BaseError;

        switch (method) {
            case HttpMethod.POST:
                error = this._postError(body);
                break;
            case HttpMethod.GET:
                break;
            case HttpMethod.PUT:
                error = this._putError(body);
                break;
            case HttpMethod.DELETE:
                error = this._deleteError(queryStringObj.id);
                break;
            default:
                break;
        }

        if (error) {
            res.writeHead(StatusCode.BAD_REQUEST, {'content-type': ContentType.APPLICATION_JSON});
            res.end(JSON.stringify(error.getJson()));
            throw new FilterError()
        }
    }

    private _postError(body: Partial<User>): BaseError {
        if (!UserValidator.validateName(body.name)) {
            return new BaseError('Name is required!');
        }

        if (!UserValidator.validateName(body.name)) {
            return new BaseError('Surname is required!');
        }

        if (body.email) {
            if (!UserValidator.validateMail(body.email)) {
                return new BaseError('Mail is not valid!');
            }
        } else {
            return new BaseError('Email is required!');
        }

        if (body.password) {
            if (!UserValidator.validatePassword(body.password)) {
                return new BaseError('Password is not valid!');
            }
        } else {
            return new BaseError('Password is required!');
        }

        return null;
    }

    private _putError(body: Partial<User>): BaseError {
        if (body.name || body.surname || body.password) {
            if (!UserValidator.validateName(body.name)) {
                return new BaseError('Name is required!');
            }

            if (!UserValidator.validateName(body.name)) {
                return new BaseError('Surname is required!');
            }

            if (body.password) {
                if (!UserValidator.validatePassword(body.password)) {
                    return new BaseError('Password is not valid!');
                }
            }

            return null;
        } else {
            return new BaseError('There is no field to update!');
        }
    }

    private _deleteError(id: string): BaseError {
        return UserValidator.validateMail(id) ? null : new BaseError('Email is required!');
    }
}
