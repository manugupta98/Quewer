import { SIDEBAR_TOGGLE } from '../constants';

const appState = {
    sideBar: true,
    user: { name: null, profileImg: null },
};

export default function userReducer(state = appState, action) {
    switch(action.type) {
        // to be filled after getting API
        case SIDEBAR_TOGGLE: {
            return {
                ...state,
                sideBar: action.payload
            }
        }
        default:
            return state;
    }
}