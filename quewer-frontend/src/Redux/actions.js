import { COURSE_UNENROLL, COURSE_ENROLL, COURSE_ADD, COURSE_DELETE, COURSE_SELECT, FETCH_COURSE_LIST, SIDEBAR_TOGGLE, ADD_QUESTION, USER_INFO, START, END } from './constants';
import axios from 'axios';
const {QuestionSerializer, QuestionDeserializer} = require('./serializer/question');
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;


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
            dispatch({
                type: FETCH_COURSE_LIST,
                payload: res.data.data
            });
            dispatch({
                type: END
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
        // dispatch({
        //     type: START
        // })
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/courses/" + courseID + "/questions").then(res => {
            console.log(res.data.data);
            dispatch({
                type: COURSE_SELECT,
                payload: {
                    id: courseID,
                    name: courseName,
                    questions: res.data.data
                }
            });
            // dispatch({
            //     type: END
            // })
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
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions`, question).then(res => {
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
            new JSONAPIDeserializer({
                keyForAttribute: 'camelCase',
            }).deserialize(res.data).then((user) => {
              console.log(user);  
              const newUser = {
                  id: user.id,
                  name: user.displayName,
                  profileImg: user.photos[0].value,
                  registeredCourses: user.registeredCourses
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