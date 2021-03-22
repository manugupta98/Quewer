import { COURSE_ADD, COURSE_ENROLL, COURSE_SELECT, COURSE_UNENROLL, COURSE_DELETE } from '../constants';

const appState = {
    enrolledCourses: [],
    courseList: [],
    currentCourse: { questions: null }
};

export default function courseReducer(state = appState, action) {
    switch(action.type) {
        case COURSE_ENROLL: {
            var list = [...state.enrolledCourses];
            list.push(action.payload);
            list.sort();
            return {
                ...state,
                enrolledCourses: list
            }
        }
        case COURSE_UNENROLL: {
            var list = [...state.enrolledCourses];
            list = list.filter(word => word !== action.payload);
            return {
                ...state,
                enrolledCourses: list
            }
        }
        case COURSE_ADD: {
            var list = [...state.courseList];
            list.push(action.payload);
            return {
                ...state,
                courseList: list
            }
        }
        case COURSE_DELETE: {
            var list = [...state.courseList];
            list = list.filter(course => course.name !== action.payload);
            return {
                ...state,
                courseList: list
            }
        }
        case COURSE_SELECT: {
            return {
                ...state,
                currentCourse: action.payload
            }
        }
        default:
            return state;
    }
}