import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { UPDATE_PAGE, UpdatePageAction } from './types';

export function navigate(path: string) {
    return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
        const page = path === '/' ? 'home' : path.slice(1);

        dispatch(loadPage(page));
    };
}

function loadPage(page: string) {
    return async (dispatch: Dispatch) => {
        switch (page) {
            case 'home':
                await import(
                    /* webpackChunkName: 'home' */
                    /* webpackMode: 'lazy' */
                    '../components/home');
                break;
            case 'login':
                await import(
                    /* webpackChunkName: 'login' */
                    /* webpackMode: 'lazy' */
                    '../components/login');
                break;
            default:
                await import(
                    /* webpackChunkName: 'notFound' */
                    /* webpackMode: 'lazy' */
                    '../components/not-found');
                break;
        }

        dispatch(updatePage(page));
    };
}

export function updatePage(page: any): UpdatePageAction {
    return {
        type: UPDATE_PAGE,
        page
    };
}
