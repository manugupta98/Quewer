import { FETCH_TEACHERS, FETCH_STUDENTS } from '../constants';

const appState = {
    students: [],
    teachers: []
};



export default function adminReducer(state = appState, action) {
    let list = [];
    switch(action.type) {
        // to be filled after getting API
        case FETCH_STUDENTS: {
            return {
                ...state,
                students: !action.payload
            }
        }
        case FETCH_TEACHERS: {
            return {
                ...state,
                teachers: !action.payload
            }
        }
        default:
            return state;
    }
}