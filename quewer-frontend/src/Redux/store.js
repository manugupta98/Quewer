import { createStore } from "redux";
import appReducers from "./reducers/appReducer";

const store = createStore(appReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;