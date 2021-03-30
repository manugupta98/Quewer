import { SIDEBAR_TOGGLE, COURSE_ENROLL, USER_INFO } from '../constants';

const appState = {
    sideBar: true,
    user: { id: null, name: null, profileImg: null, registeredCourses: [] },
    loading: false
};



export default function userReducer(state = appState, action) {
    let list = [];
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
        case COURSE_ENROLL: {
            list = [...state.user.registeredCourses];
            list.push(action.payload.courseName);
            list.sort();
            console.log(list);
            return {
                ...state,
                user: {
                    ...state.user,
                    registeredCourses: list
                }
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