/**
 * Single source of truth of the project.
 *
 * @author Caglar Alkis
 */

import { applyMiddleware, combineReducers, compose as originalCompose, createStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer, LazyStore } from 'pwa-helpers/lazy-reducer-enhancer';
import logger from 'redux-logger';
import { app } from './reducers/app';
import { auth } from './reducers/auth';

const compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || originalCompose;

export const store: Store & LazyStore = createStore(
    (state, action) => state,
    compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk, logger))
);

const rootReducers: { [key: string]: Reducer } = {
    app,
    auth,
};

store.addReducers({
   ...rootReducers
});

