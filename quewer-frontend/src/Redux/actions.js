import { COURSE_UNENROLL, COURSE_ENROLL, COURSE_ADD, COURSE_DELETE, COURSE_SELECT, FETCH_COURSE_LIST, SIDEBAR_TOGGLE, ADD_QUESTION, USER_INFO, START, END, UPVOTE_QUESTION, BOOKMARK_QUESTION, GET_ANSWERS, FETCH_TEACHERS, FETCH_STUDENTS, UPVOTE_ANSWER, GET_FEEDBACKS, GET_ANNOUNCEMENTS, ADMIN_ADD_COURSE } from './constants';
import axios from 'axios';
import store from './store';
import { useDispatch, useSelector } from 'react-redux';
const { QuestionSerializer, QuestionDeserializer } = require('./serializer/question');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const Serializer = require('./serializer/serializer');
const FormData = require('form-data');

const startLoading = dispatch => dispatch({type: START});
const endLoading = dispatch => dispatch({type: END});


export function enrollCourse(courseID, courseName) {
    return dispatch => {
        startLoading(dispatch);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/enroll`).then(res => {
            console.log(`Course ${courseID} added!`);
            dispatch({
                type: COURSE_ENROLL,
                payload: {
                    id: courseID,
                    title: courseName
                }
            });
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function fetchCourses() {
    return dispatch => {
        startLoading(dispatch);
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/courses").then(res => {
            new JSONAPIDeserializer({
                keyForAttribute: 'camelCase',
            }).deserialize(res.data).then((courses) => {
                dispatch({
                    type: FETCH_COURSE_LIST,
                    payload: courses
                });
                endLoading(dispatch);
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

export const unenrollCourse = (courseID, courseName) => {
    return dispatch => {
        startLoading(dispatch);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/unenroll`).then(res => {
            console.log(`Course ${courseID} removed!`);
            dispatch({
                type: COURSE_UNENROLL,
                payload: {
                    id: courseID,
                    title: courseName
                }
            });
            endLoading(dispatch);
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
        startLoading(dispatch);
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/courses/" + courseID + "/questions").then(res => {
            Serializer.deserializeAsync("question", res.data).then((questions) => {
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
            endLoading(dispatch);
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

export function addQuestion(question, courseID, files) {
    return dispatch => {
        startLoading(dispatch);
        question = Serializer.serialize("question", question);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions`, question).then(res => {
            console.log("status", res)
            Serializer.deserializeAsync("question", res.data).then((question) => {
                let form = new FormData();
                for (let i = 0; i < files.length; i++){
                    form.append('attachments[]', files[i]);
                }
                // form.append('attachments', files);
                axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${question.id}/attachments`, form).then(response => {
                    Serializer.deserializeAsync("question", response.data).then((newQuestion) => {
                        console.log(newQuestion);
                        dispatch({
                            type: ADD_QUESTION,
                            payload: newQuestion
                        })
                    })
                })
            })
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function userInfo() {
    return dispatch => {
        startLoading(dispatch);
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
                    type: user.type,
                    answerBookmarks: user.answerBookmarks,
                    answerUpvoted: user.answerUpvoted,
                    answerDownvoted: user.answerDownvoted
                };
                dispatch({
                    type: USER_INFO,
                    payload: newUser
                });
                endLoading(dispatch);
            })
        }).catch((err) => {
            console.error(err);
        })
    }
}

export function upvoteQuestion(courseID, questionID, upvote) {
    return dispatch => {
        startLoading(dispatch);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/vote?action=${upvote}`).then(res => {
            dispatch({
                type: UPVOTE_QUESTION,
                payload: {
                    type: upvote,
                    id: questionID
                }
            });
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function upvoteAnswer(courseID, questionID, answerID, upvote) {
    return dispatch => {
        startLoading(dispatch);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/answers/${answerID}vote?action=${upvote}`).then(res => {
            dispatch({
                type: UPVOTE_ANSWER,
                payload: {
                    type: upvote,
                    id: answerID
                }
            });
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function bookmarkQuestion(courseID, questionID, bookmark) {
    return dispatch => {
        startLoading(dispatch);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/bookmark?action=${bookmark}`).then(res => {
            dispatch({
                type: BOOKMARK_QUESTION,
                payload: {
                    type: bookmark,
                    id: questionID
                }
            });
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function bookmarkAnswer(courseID, questionID, answerID, bookmark) {
    return dispatch => {
        startLoading(dispatch);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/answers/${answerID}/bookmark?action=${bookmark}`).then(res => {
            dispatch({
                type: BOOKMARK_QUESTION,
                payload: {
                    type: bookmark,
                    id: answerID
                }
            });
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function addAnswer(answer, questionID, courseID) {
    return dispatch => {
        startLoading(dispatch);
        console.log(answer);
        answer = Serializer.serialize("answer", answer);
        console.log("after", answer);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/answers`, answer).then(res => {
            console.log("status", res)
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function fetchAnswers(courseID, questionID) {
    return dispatch => {
        startLoading(dispatch);
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/answers`).then(res => {
            Serializer.deserializeAsync("answer", res.data).then((answers) => {
                console.log(answers);
                dispatch({
                    type: GET_ANSWERS,
                    payload: {
                        id: courseID,
                        answers: answers
                    }
                });
            })
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function addFeedback(feedback, courseID) {
    return dispatch => {
        startLoading(dispatch);
        feedback = Serializer.serialize("feedback", feedback);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/feedbacks`, feedback).then(res => {
            console.log("status", res)
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function getFeedback(courseID) {
    return dispatch => {
        startLoading(dispatch);
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/feedbacks`).then(res => {
            Serializer.deserializeAsync("feedback", res.data).then((feedback) => {
                console.log(feedback);
                dispatch({
                    type: GET_FEEDBACKS,
                    payload: feedback
                });
            })
            endLoading(dispatch);
            showSelectedCourseOnSidebar(courseID, true);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function addAnnouncement(announcement, courseID) {
    return dispatch => {
        startLoading(dispatch);
        announcement = Serializer.serialize("announcement", announcement);
        console.log(announcement);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/announcements`, announcement).then(res => {
            console.log("status", res)
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function getAnnouncement(courseID) {
    return dispatch => {
        startLoading(dispatch);
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/announcements`).then(res => {
            Serializer.deserializeAsync("announcement", res.data).then((announcement) => {
                console.log(announcement);
                dispatch({
                    type: GET_ANNOUNCEMENTS,
                    payload: announcement
                });
            })
            endLoading(dispatch);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function fetchTeachers() {
    return dispatch => {
        return axios.get(process.env.REACT_APP_SERVER_URL + '/api/teachers').then(res => {
            dispatch({
                type: FETCH_TEACHERS,
                payload: res.data.data
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

export function fetchStudents() {
    return dispatch => {
        return axios.get(process.env.REACT_APP_SERVER_URL + '/api/students').then(res => {
            dispatch({
                type: FETCH_STUDENTS,
                payload: res.data.data
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

export function addAdminCourse(course) {
    return dispatch => {
        dispatch({
            type:ADMIN_ADD_COURSE,
            payload: course
        })
    }
}

export function showSelectedCourseOnSidebar(courseID, considerProps) {
    if (considerProps !== true)
        courseID = store.getState().course.currentCourse.id;
    
    const courses = store.getState().user.user.registeredCourses;
    courses.forEach(c => {
        const sideBarBtn = document.getElementById(c.id);
        if (c.id === courseID) sideBarBtn.classList.add('Selected');
        else sideBarBtn.classList.remove('Selected');
    });
}
