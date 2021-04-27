import { COURSE_ADD, COURSE_SELECT, COURSE_DELETE, ADD_QUESTION, FETCH_COURSE_LIST, GET_ANSWERS, ADD_COMMENT, ADMIN_ADD_COURSE, GET_FEEDBACKS, GET_ANNOUNCEMENTS, GET_CHOICE_QUESTION, SET_CURRENT_QUESTION } from '../constants';
import store from '../store';
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
    currentQuestion: {},
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
            return {
                ...state,
                currentCourse: {
                    ...state.currentCourse,
                    questions: questions
                }
            }
        }
        case ADD_COMMENT: {
            var answers = [...state.currentAnswers];
            let answerId = action.answerId;
            let comment = action.comment;
            let index = answers.indexOf(answers.find(answer => answer.id === answerId));
            let answer = answers[index]
            answer.comments.push(comment);
            return {
                ...state,
                currentAnswers: answers
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
        case ADMIN_ADD_COURSE: {
            const list = [...state.courseList];
            list.push(action.payload);
            return {
                ...state,
                courseList: list
            }
        }
        case GET_CHOICE_QUESTION: {
            return {
                ...state,
                choice: action.payload
            }
        }
        case SET_CURRENT_QUESTION: {
            list = [...state.currentCourse.questions];
            list = list.filter(question => question.id === action.payload.id);
            if(list.length === 0) {
                list = [...action.payload.qUp];
                list = list.filter(question => question.id === action.payload.id);
            }
            if(list.length === 0) {
                list = [...action.payload.qDown];
                list = list.filter(question => question.id === action.payload.id);
            }
            if(list.length === 0) {
                list = [...action.payload.qBook];
                list = list.filter(question => question.id === action.payload.id);
            }
            const question = list[0];
            return {
                ...state,
                currentQuestion: question
            }
        }
        default:
            return state;
    }
}