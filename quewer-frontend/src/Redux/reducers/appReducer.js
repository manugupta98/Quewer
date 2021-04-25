import courseReducer from './courseReducer';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import stateReducer from './stateReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    course: courseReducer,
    user: userReducer,
    appState: stateReducer,
    admin: adminReducer
});