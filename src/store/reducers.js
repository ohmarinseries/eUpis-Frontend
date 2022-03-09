import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux';
import authReducer from "./reducers/authentication";



const rootReducers= combineReducers({
    authReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default persistedReducer;