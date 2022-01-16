import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistedReducer from './reducers';
import {persistStore} from 'redux-persist';

const store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunkMiddleware))
);

const persistor = persistStore(store)

export {store, persistor};