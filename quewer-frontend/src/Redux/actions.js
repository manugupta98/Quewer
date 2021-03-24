import { COURSE_UNENROLL, COURSE_ENROLL, COURSE_ADD, COURSE_DELETE, COURSE_SELECT, SIDEBAR_TOGGLE, ADD_QUESTION, USER_INFO } from './constants';

export const enrollCourse = name => {
    return {
        type: COURSE_ENROLL,
        payload: name
    }
}

export const unenrollCourse = name => {
    return {
        type: COURSE_UNENROLL,
        payload: name
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

export const selectCourse = course => {
    return {
        type: COURSE_SELECT,
        payload: course
    }
}

export const toggleSideBar = () => {
    return {
        type: SIDEBAR_TOGGLE
    }
}

export const addQuestion = question => {
    return {
        type: ADD_QUESTION,
        payload: question
    }
}

export const userInfo = user => {
    return {
        type: USER_INFO,
        payload: user
    }
}