import courseReducer from './courseReducer';
import { combineReducers } from '@reduxjs/toolkit';
import { useReducer } from 'react';

export default combineReducers({
    course: courseReducer
});