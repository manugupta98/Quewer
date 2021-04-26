import { COURSE_ADD, COURSE_SELECT, COURSE_DELETE, ADD_QUESTION, FETCH_COURSE_LIST, GET_ANSWERS, ADD_FEEDBACK, GET_FEEDBACKS, GET_ANNOUNCEMENTS, GET_CHOICE_QUESTION } from '../constants';

const appState = {
    enrolledCourses: [],
    courseList: [],
    currentCourse: { 
        id: null,
        name: null,
        questions: [],
        feedbacks: [],
        announcements: []
    },
    currentAnswers: [],
    choice: []
};

export default function courseReducer(state = appState, action) {
    let list = [];
    switch(action.type) {
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
                    name: action.payload.name,
                    questions: action.payload.questions
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
            console.log(questions);
            return {
                ...state,
                currentCourse: {
                    ...state.currentCourse,
                    questions: questions
                }
            }
        }
        case GET_ANSWERS: {
            return {
                ...state,
                currentAnswers: action.payload.answers,
                currentCourse: {
                    ...state.currentCourse,
                    id: action.payload.id
                }
            }
        }
        case GET_FEEDBACKS: {
            return {
                ...state,
                currentCourse: {
                    ...state.currentCourse,
                    feedbacks: action.payload
                }
            }
        }
        case GET_ANNOUNCEMENTS: {
            return {
                ...state,
                currentCourse: {
                    ...state.currentCourse,
                    announcements: action.payload
                }
            }
        }
        case GET_CHOICE_QUESTION: {
            return {
                ...state,
                choice: action.payload
            }
        }
        default:
            return state;
    }
}