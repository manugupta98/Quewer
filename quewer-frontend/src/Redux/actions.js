import { COURSE_UNENROLL, COURSE_ENROLL, COURSE_ADD, COURSE_DELETE, COURSE_SELECT, FETCH_COURSE_LIST, SIDEBAR_TOGGLE, ADD_QUESTION, USER_INFO } from './constants';
import axios from 'axios';
const {QuestionSerializer, QuestionDeserializer} = require('./serializer/question');


export function enrollCourse(courseID, courseName) {
    return dispatch => {
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/enroll`).then(res => {
            console.log(`Course ${courseID} added!`);
            dispatch({
                type: COURSE_ENROLL,
                payload: {
                    courseID: courseID,
                    courseName: courseName
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

export function fetchCourses() {
    return dispatch => {
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/courses").then(res => {
            dispatch({
                type: FETCH_COURSE_LIST,
                payload: res.data.data
            });
        }).catch(err => {
            console.log(err);
        })
    }
}

export const unenrollCourse = (courseID, courseName) => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/unenroll`).then(res => {
            console.log(`Course ${courseID} removed!`);
            dispatch({
                type: COURSE_UNENROLL,
                payload: {
                    courseID: courseID,
                    courseName: courseName
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
    // return {
    //     type: COURSE_UNENROLL,
    //     payload: name
    // }
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

export const selectCourse = (courseID, courseName) => {
    return {
        type: COURSE_SELECT,
        payload: {
            id: courseID,
            name: courseName
        }
    }
}

export const toggleSideBar = () => {
    return {
        type: SIDEBAR_TOGGLE
    }
}

export function addQuestion(question, courseID) {
    return dispatch => {
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions`, question).then(res => {
            QuestionDeserializer.deserialize(res.data).then((newQuestion) => {
                console.log(newQuestion);
                console.log(`Question ${question} posted!`);
                dispatch({
                    type: ADD_QUESTION,
                    payload: newQuestion,
                });
            }); 
        }).catch(err => {
            console.log(err);
        });
    }
}

export function userInfo() {
    return dispatch => {
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/users").then((res) => {
            const data = res.data.data;
            console.log(data);
            const user = {
                id: data.id,
                name: data.attributes.displayName,
                profileImg: data.attributes.photos[0].value,
                registeredCourses: data.relationships.registeredCourses.data
            };
            dispatch({
                type: USER_INFO,
                payload: user
            });
        }).catch((err) => {
            console.error(err);
        })
    }
}
