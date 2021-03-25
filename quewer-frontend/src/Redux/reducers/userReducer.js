import { SIDEBAR_TOGGLE, USER_INFO } from '../constants';
import axios from 'axios';

const appState = {
    sideBar: true,
    user: { id: null, name: null, profileImg: null, registeredCourses: [] },
    loading: false
};



export default function userReducer(state = appState, action) {
    switch(action.type) {
        // to be filled after getting API
        case SIDEBAR_TOGGLE: {
            return {
                ...state,
                sideBar: !state.sideBar
            }
        }
        case USER_INFO: {
            return {
                ...state,
                user: action.payload
            }
        }
        default:
            return state;
    }
}

class Course {
    constructor(title, description, teacher, regUsers) {
        this.title = title;
        this.desc = description;
        this.teacher = teacher;
        this.registeredUsers = regUsers;
    }


}