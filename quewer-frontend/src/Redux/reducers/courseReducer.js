import { COURSE_ADD, COURSE_SELECT, COURSE_DELETE, ADD_QUESTION, FETCH_COURSE_LIST, GET_ANSWERS, ADD_COMMENT, ADMIN_ADD_COURSE, GET_FEEDBACKS, GET_ANNOUNCEMENTS, GET_CHOICE_QUESTION, SET_CURRENT_QUESTION, UPVOTE_COUNT_QUESTION, UPVOTE_COUNT_ANSWER } from '../constants';
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
            console.log("Answers:", action.payload.answers);
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
            list = list.filter(question => question.id === action.payload);
            const question = list[0];
            console.log("Current Question", question);
            return {
                ...state,
                currentQuestion: question
            }
        }
        case UPVOTE_COUNT_QUESTION: {
            const diff = action.diff;
            const currCourse = {...state.currentCourse};
            for (let i = 0; i < currCourse.questions.length; i++) {
                if (currCourse.questions[i].id === action.id) {
                    currCourse.questions[i].upvotes += diff;
                }
            }
            const currQue = {...state.currentQuestion};
            if (state.currentQuestion.id === action.id) {
                currQue.upvotes += diff;
            }
            console.log('Current Question:', currQue);
            console.log('Current Course', currCourse);
            return {
                ...state,
                currentQuestion: currQue,
                currentCourse: currCourse
            }
        }
        case UPVOTE_COUNT_ANSWER: {
            const diff = action.diff;
            const currAns = [...state.currentAnswers];
            // const currQue = {...state.currentQuestion};
            for (let i = 0; i < currAns.length; i++)
                if (currAns[i].id === action.id)
                    currAns[i].upvotes += diff;
            return {
                ...state,
                currentAnswers: currAns
            }
        }
        default:
            return state;
    }
}