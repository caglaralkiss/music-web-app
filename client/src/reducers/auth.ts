import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LoginActionTypes } from '../actions/auth/types';

export function auth(state: {} = {}, action: LoginActionTypes) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                user: action.user,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}
