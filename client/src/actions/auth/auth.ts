import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LoginActionTypes, User } from './types';
import { ThunkDispatch } from 'redux-thunk';
import Api from '../../axios';

export const login = (mail: string, password: string) => {
    return async (dispatch: ThunkDispatch<any, any, LoginActionTypes>) => {
        try {
            dispatch(loginRequest());
            const token = await Api.Auth.login(mail, password);
            dispatch(loginSuccess({
                mail,
                token
            }));
        } catch (e) {
            dispatch(loginError(e));
        }
    };
};

export const loginRequest = (): LoginActionTypes => {
    return {
        type: LOGIN_REQUEST,
    };
};

export const loginSuccess = (user: User): LoginActionTypes => {
    return {
        type: LOGIN_SUCCESS,
        isAuthenticated: true,
        user,
    };
};

export const loginError = (error: Error | string): LoginActionTypes => {
    return {
        type: LOGIN_ERROR,
        error,
    };
};
