import { AnyAction } from 'redux';
import { UPDATE_PAGE } from '../actions/types';

export function rootReducer(state: {page: any} = {page: 'home'}, action: AnyAction) {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page
            };
        default:
            return state;
    }
}
