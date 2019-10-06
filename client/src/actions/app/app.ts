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
            case 'songs':
                await import(
                    /* webpackChunkName: 'songs' */
                    /* webpackMode: 'lazy' */
                    '../../components/songs-page');
                break;
            case 'login':
                await import(
                    /* webpackChunkName: 'login' */
                    /* webpackMode: 'lazy' */
                    '../../components/login-page');
                break;
            case 'search':
                await import(
                    /* webpackChunkName: 'search' */
                    /* webpackMode: 'lazy' */
                    '../../components/search-page');
                break;
            default:
                page = 'not-found';
                break;
        }

        if (page === 'not-found') {
            import('../../components/not-found-page');
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
