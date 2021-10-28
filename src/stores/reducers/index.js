import {combineReducers} from 'redux';

import chatReducer from './chatReducer';
import userReducer from './userReducer';

const reducers = {
  chat: chatReducer,
  user: userReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
