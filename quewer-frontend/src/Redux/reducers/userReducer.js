import { SIDEBAR_TOGGLE, COURSE_ENROLL, USER_INFO, COURSE_UNENROLL, START, END, UPVOTE_QUESTION, DOWNVOTE_QUESTION, BOOKMARK_QUESTION, UPVOTE_ANSWER, BOOKMARK_ANSWER } from '../constants';

const appState = {
    sideBar: true,
    user: { id: null, name: null, profileImg: null, registeredCourses: [], questionUpvoted: [], questionDownvoted: [], answerUpvoted: [], answerDownvoted: [], questionBookmarks: [], answerBookmarks: [] },
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
                list.push(action.payload.id);
                let list1 = [...state.user.questionUpvoted]
                list1 = list1.filter(id => id !== action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        questionUpvoted: list,
                        questionDownvoted: list1
                    }
                }
            } else if(action.payload.type === "downvote") {
                list = [...state.user.questionDownvoted]
                list.push(action.payload.id);
                let list1 = [...state.user.questionUpvoted];
                list1 = list1.filter(id => id !== action.payload.id)
                return {
                    ...state,
                    user: {
                        ...state.user,
                        questionDownvoted: list,
                        questionUpvoted: list1
                    }
                }
            } else {
                list = [...state.user.questionDownvoted]
                list = list.filter(id => id !== action.payload.id)
                let list1 = [...state.user.questionUpvoted];
                list1 = list1.filter(id => id !== action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        questionDownvoted: list,
                        questionUpvoted: list1
                    }
                }
            }
        }
        case UPVOTE_ANSWER: {
            if(action.payload.type === "upvote") {
                list = [...state.user.answerUpvoted];
                list.push(action.payload.id);
                let list1 = [...state.user.answerDownvoted];
                list1 = list1.filter(id => id !== action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        answerUpvoted: list,
                        answerDownvoted: list1
                    }
                }
            } else if(action.payload.type === "downvote") {
                list = [...state.user.answerDownvoted]
                list.push(action.payload.id);
                let list1 = [...state.user.answerUpvoted];
                list1 = list1.filter(id => id !== action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        answerDownvoted: list,
                        answerUpvoted: list1
                    }
                }
            } else {
                list = [...state.user.answerDownvoted]
                list = list.filter(id => id !== action.payload.id);
                let list1 = [...state.user.answerUpvoted];
                list1 = list1.filter(id => id !== action.payload.id);
                return {
                    ...state,
                    user: {
                        ...state.user,
                        answerDownvoted: list,
                        answerUpvoted: list1
                    }
                }
            }
        }
        case BOOKMARK_QUESTION: {
            if(action.payload.type === "bookmark") {
                list = [...state.user.questionBookmarks]
                list.push(action.payload.id);
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
                list.push(action.payload.id);
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