import { ADD_TEACHERS } from '../constants';

const appState = {
    teachers: []
};



export default function adminReducer(state = appState, action) {
    let list = [];
    switch(action.type) {
        // to be filled after getting API
        case ADD_TEACHERS: {
            return {
                ...state,
                teachers: action.payload
            }
        }
        default:
            return state;
    }
}