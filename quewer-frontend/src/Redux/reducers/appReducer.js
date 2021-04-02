import courseReducer from './courseReducer';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import stateReducer from './stateReducer';

export default combineReducers({
    course: courseReducer,
    user: userReducer,
    appState: stateReducer
});