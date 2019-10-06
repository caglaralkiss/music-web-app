import { AnyAction } from 'redux';
import { UPDATE_PAGE } from '../actions/app/types';

export function app(state: { page: string } = { page: 'not-found' }, action: AnyAction) {
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
