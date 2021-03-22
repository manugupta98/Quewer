import { createStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';

const store = createStore(appReducer);

export default store;