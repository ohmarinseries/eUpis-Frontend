import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux';



const rootReducers= combineReducers({

})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer'],
}

const persistedReducer = persistReducer(persistConfig,rootReducers);

export default persistedReducer;