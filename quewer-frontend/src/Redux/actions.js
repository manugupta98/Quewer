import { COURSE_UNENROLL, COURSE_ENROLL, COURSE_ADD, COURSE_DELETE, COURSE_SELECT, FETCH_COURSE_LIST, SIDEBAR_TOGGLE, ADD_QUESTION, USER_INFO, START, END, UPVOTE_QUESTION, BOOKMARK_QUESTION } from './constants';
import axios from 'axios';
import store from './store';
const {QuestionSerializer, QuestionDeserializer} = require('./serializer/question');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const Serializer = require('./serializer/serializer');


export function enrollCourse(courseID, courseName) {
    return dispatch => {
        dispatch({
            type: START,
        })
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/enroll`).then(res => {
            console.log(`Course ${courseID} added!`);
            dispatch({
                type: COURSE_ENROLL,
                payload: {
                    id: courseID,
                    title: courseName
                }
            });
            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
        });
    }
}

export function fetchCourses() {

    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/courses").then(res => {
            new JSONAPIDeserializer({
                keyForAttribute: 'camelCase',
            }).deserialize(res.data).then((courses) => {
                dispatch({
                    type: FETCH_COURSE_LIST,
                    payload: courses
                });
                dispatch({
                    type: END
                })
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

export const unenrollCourse = (courseID, courseName) => {
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/unenroll`).then(res => {
            console.log(`Course ${courseID} removed!`);
            dispatch({
                type: COURSE_UNENROLL,
                payload: {
                    id: courseID,
                    title: courseName
                }
            });
            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
        });
    }
}

// would be used in case of admin portal
export const addCourse = (course, desc) => {
    return {
        type: COURSE_ADD,
        payload: {
            course: course,
            desc: desc
        }
    }
}

// would be used in case of admin portal
export const deleteCourse = course => {
    return {
        type: COURSE_DELETE,
        payload: course
    }
}

export function selectCourse(courseID, courseName) {
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/courses/" + courseID + "/questions").then(res => {
            new JSONAPIDeserializer({
                keyForAttribute: 'camelCase',
            }).deserialize(res.data).then((questions) => {
                console.log(questions);
                dispatch({
                    type: COURSE_SELECT,
                    payload: {
                        id: courseID,
                        name: courseName,
                        questions: questions
                    }
                });
            })

            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

export const toggleSideBar = () => {
    return {
        type: SIDEBAR_TOGGLE
    }
}

export function addQuestion(question, courseID) {
    return dispatch => {
        dispatch({
            type: START
        })
        console.log("question befor serialization", question);
        question = Serializer.serialize("question", question);
        console.log("question", question);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions`, question).then(res => {
            console.log("status", res)
            Serializer.deserializeAsync("question", res.data).then((question) => {
                console.log(question);
                dispatch({
                    type: ADD_QUESTION,
                    payload: question
                })
            })
            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
        });
    }
}

export function userInfo() {
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/users?include=courses").then((res) => {
            Serializer.deserializeAsync("user", res.data).then((user) => {  
              const newUser = {
                  id: user.id,
                  name: user.displayName,
                  profileImg: user.photos[0].value,
                  registeredCourses: user.registeredCourses,
                  questionBookmarks: user.questionBookmarks,
                  questionDownvoted: user.questionDownvoted,
                  questionUpvoted: user.questionUpvoted,
                  type: user.type
              };
              dispatch({
                  type: USER_INFO,
                  payload: newUser
              });
              dispatch({
                  type: END
              })
            })
        }).catch((err) => {
            console.error(err);
        })
    }
}

export function upvoteQuestion(courseID, questionID, upvote) {
    console.log("hello");
    return dispatch => {
        dispatch({
            type: START
        });
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/vote?action=${upvote}`).then(res => {
            dispatch({
                type: UPVOTE_QUESTION,
                payload: {
                    type: upvote,
                    id: questionID
                }
            });
            dispatch({
                type: END
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

export function bookmarkQuestion(courseID, questionID, bookmark) {
    return dispatch => {
        dispatch({
            type: START
        });
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/bookmark?action=${bookmark}`).then(res => {
            dispatch({
                type: BOOKMARK_QUESTION,
                payload: {
                    type: bookmark,
                    id: questionID
                }
            });
            dispatch({
                type: END
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

export function addAnswer(answer, questionID, courseID) {
    return dispatch => {
        // dispatch({
        //     type: START
        // })
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/answers`, answer).then(res => {
            console.log(res);
            // new JSONAPIDeserializer({
            //     keyForAttribute: 'camelCase',
            // }).deserialize(res.data).then((question) => {
            //     console.log(question);
            //     dispatch({
            //         type: ADD_QUESTION,
            //         payload: question
            //     })
            // })
            // dispatch({
            //     type: END
            // })
        }).catch(err => {
            console.log(err);
        });
    }
}