import { createStore, applyMiddleware } from "redux";
import appReducers from "./reducers/appReducer";
import thunk from 'redux-thunk';

const store = createStore(appReducers, applyMiddleware(thunk));
export default store;