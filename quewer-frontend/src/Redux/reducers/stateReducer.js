import { START, END } from '../constants';

const appState = {
    loading: false
};

export default function stateReducer(state = appState, action) {
switch(action.type) {
    case START: {
        return {
            ...state,
            loading: true
        }
    }
    case END: {
        return {
            ...state,
            loading: false
        }
    }
        default:
            return state;
    }
}