import { COURSE_ADD, COURSE_ENROLL, COURSE_SELECT, COURSE_UNENROLL, COURSE_DELETE, ADD_QUESTION, FETCH_COURSE_LIST } from '../constants';

const appState = {
    enrolledCourses: [],
    courseList: [],
    currentCourse: { 
        id: null,
        name: null,
        questions: [] 
    }
};

export default function courseReducer(state = appState, action) {
    let list = [];
    switch(action.type) {
        case COURSE_ENROLL: {
            list = [...state.enrolledCourses];
            list.push(action.payload.courseName);
            list.sort();
            return {
                ...state,
                enrolledCourses: list
            }
        }
        case COURSE_UNENROLL: {
            list = [...state.enrolledCourses];
            list = list.filter(word => word !== action.payload.name);
            return {
                ...state,
                enrolledCourses: list
            }
        }
        case COURSE_ADD: {
            list = [...state.courseList];
            list.push(action.payload);
            return {
                ...state,
                courseList: list
            }
        }
        case COURSE_DELETE: {
            list = [...state.courseList];
            list = list.filter(course => course.name !== action.payload);
            return {
                ...state,
                courseList: list
            }
        }
        case COURSE_SELECT: {
            return {
                ...state,
                currentCourse: {
                    ...state.currentCourse,
                    id: action.payload.id,
                    name: action.payload.name
                    // questions: action.payload
                }
            }
        }
        case FETCH_COURSE_LIST: {
            return {
                ...state,
                courseList: action.payload
            }
        }
        case ADD_QUESTION: {
            var questions = [...state.currentCourse.questions];
            questions.push(action.payload);
            return {
                ...state,
                currentCourse: {
                    ...state.currentCourse,
                    questions: questions
                }
            }
        }
        default:
            return state;
    }
}