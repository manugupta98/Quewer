import { SIDEBAR_TOGGLE, COURSE_ENROLL, USER_INFO, COURSE_UNENROLL, START, END, UPVOTE_QUESTION, DOWNVOTE_QUESTION, BOOKMARK_QUESTION, UPVOTE_ANSWER, BOOKMARK_ANSWER } from '../constants';

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
        case UPVOTE_QUESTION: {
            if(action.payload.type === "upvote") {
                list = [...state.user.questionUpvoted];
                list = list.push(action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        questionUpvoted: list
                    }
                }
            } else if(action.payload.type === "downvote") {
                list = [...state.user.questionDownvoted]
                list = list.push(action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        questionDownvoted: list
                    }
                }
            } else {
                list = [...state.user.questionDownvoted]
                list = list.filter(id => id !== action.payload.id)
                return {
                    ...state,
                    user: {
                        ...state.user,
                        questionDownvoted: list
                    }
                }
            }
        }
        case UPVOTE_ANSWER: {
            if(action.payload.type === "upvote") {
                list = [...state.user.answerUpvoted];
                list = list.push(action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        answerUpvoted: list
                    }
                }
            } else if(action.payload.type === "downvote") {
                list = [...state.user.answerDownvoted]
                list = list.push(action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        answerDownvoted: list
                    }
                }
            } else {
                list = [...state.user.answerDownvoted]
                list = list.filter(id => id !== action.payload.id)
                return {
                    ...state,
                    user: {
                        ...state.user,
                        answerDownvoted: list
                    }
                }
            }
        }
        case BOOKMARK_QUESTION: {
            if(action.payload.type === "bookmark") {
                list = [...state.user.questionBookmarks]
                list = list.push(action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        questionBookmarks: list
                    }
                }
            } else {
                list = [...state.user.questionBookmarks]
                list = list.filter(id => id !== action.payload.id)
                return {
                    ...state,
                    user: {
                        ...state.user,
                        questionBookmarks: list
                    }
                }
            }
        }
        case BOOKMARK_ANSWER: {
            if(action.payload.type === "bookmark") {
                list = [...state.user.answerBookmarks]
                list = list.push(action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        answerBookmarks: list
                    }
                }
            } else {
                list = [...state.user.answerBookmarks]
                list = list.filter(id => id !== action.payload.id)
                return {
                    ...state,
                    user: {
                        ...state.user,
                        answerBookmarks: list
                    }
                }
            }
        }
        default:
            return state;
    }
}