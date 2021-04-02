import { SIDEBAR_TOGGLE, COURSE_ENROLL, USER_INFO, COURSE_UNENROLL, START, END } from '../constants';

const appState = {
    sideBar: true,
    user: { id: null, name: null, profileImg: null, registeredCourses: [] },
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
            list.push(action.payload);
            console.log(list);
            return {
                ...state,
                user: {
                    ...state.user,
                    registeredCourses: list
                }
            }
        }
        case COURSE_UNENROLL: {
            list = [...state.user.registeredCourses];
            list = list.filter(word => word.id !== action.payload.id);
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