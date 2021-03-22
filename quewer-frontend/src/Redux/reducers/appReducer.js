import courseReducer from './courseReducer';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';

export default combineReducers({
    course: courseReducer,
    user: userReducer
});