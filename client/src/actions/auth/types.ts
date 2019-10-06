import { Action } from 'redux';

export interface User {
    mail: string;
    token: string;
}

export interface UserState {
    isAuthenticated: boolean;
    user: User;
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

interface LoginRequestAction extends Action<typeof LOGIN_REQUEST> {
}

interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
    isAuthenticated: boolean;
    user: User;
}

interface LoginErrorAction extends Action<typeof LOGIN_ERROR> {
    error: Error | string;
}

export type LoginActionTypes = LoginRequestAction | LoginSuccessAction | LoginErrorAction;
