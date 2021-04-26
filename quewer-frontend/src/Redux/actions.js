import { COURSE_UNENROLL, COURSE_ENROLL, COURSE_ADD, COURSE_DELETE, COURSE_SELECT, FETCH_COURSE_LIST, SIDEBAR_TOGGLE, ADD_QUESTION, USER_INFO, START, END, UPVOTE_QUESTION, BOOKMARK_QUESTION, GET_ANSWERS, FETCH_STUDENTS, FETCH_TEACHERS, UPVOTE_ANSWER, GET_FEEDBACKS, GET_ANNOUNCEMENTS, GET_CHOICE_QUESTION } from './constants';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import store from './store';
const { QuestionSerializer, QuestionDeserializer } = require('./serializer/question');
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
            alert("Course could not be enrolled, try again later.");
            <Redirect to='/enroll' />
            dispatch({
                type: END
            })
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
                console.log(courses);
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
            alert("Failure in fetching courses");
            <Redirect to='/main' />
            dispatch({
                type: END
            })
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
            alert("Course could not be unenrolled, try again later.");
            <Redirect to='/enroll' />
            dispatch({
                type: END
            })
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

            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Course contents could not be fetched, try again later.");
            <Redirect to='/main' />
            dispatch({
                type: END
            })
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
        question = Serializer.serialize("question", question);
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
            alert("Question could not be posted, try again later.");
            <Redirect to={`/main`} />
            dispatch({
                type: END
            })
        });
    }
}

export function userInfo() {
    return async dispatch => {
        dispatch({
            type: START
        })
        await axios.get(process.env.REACT_APP_SERVER_URL + "/api/users?include=courses").then((res) => {
            localStorage.setItem("loggedIn", true);
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
                console.log(newUser)
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
            <Redirect to='/main' />
            dispatch({
                type: END
            })
        })
    }
}

export function upvoteQuestion(courseID, questionID, upvote) {
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
            alert("Question could not be upvoted, try again later.");
            dispatch({
                type: END
            })
        });
    }
}

export function upvoteAnswer(courseID, questionID, answerID, upvote) {
    return dispatch => {
        dispatch({
            type: START
        });
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/answers/${answerID}vote?action=${upvote}`).then(res => {
            dispatch({
                type: UPVOTE_ANSWER,
                payload: {
                    type: upvote,
                    id: answerID
                }
            });
            dispatch({
                type: END
            });
        }).catch(err => {
            console.log(err);
            alert("Answer could not be upvoted, try again later.");
            dispatch({
                type: END
            })
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
            alert("Question could not be bookmarked, try again later.");
            dispatch({
                type: END
            })
        });
    }
}

export function bookmarkAnswer(courseID, questionID, answerID, bookmark) {
    return dispatch => {
        dispatch({
            type: START
        });
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/answers/${answerID}/bookmark?action=${bookmark}`).then(res => {
            dispatch({
                type: BOOKMARK_QUESTION,
                payload: {
                    type: bookmark,
                    id: answerID
                }
            });
            dispatch({
                type: END
            });
        }).catch(err => {
            console.log(err);
            alert("Answer could not be bookmarked, try again later.");
            dispatch({
                type: END
            })
        });
    }
}

export function addAnswer(answer, questionID, courseID) {
    return dispatch => {
        dispatch({
            type: START
        })
        console.log(answer);
        answer = Serializer.serialize("answer", answer);
        console.log("after", answer);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/questions/${questionID}/answers`, answer).then(res => {
            console.log("status", res)
            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Answer could not be posted, try again later.");
            <Redirect to={`/main`} />
            dispatch({
                type: END
            })
        });
    }
}

export function fetchAnswers(courseID, questionID) {
    return dispatch => {
        dispatch({
            type: START
        })
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

            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Answers could not be fetched, try again later.");
            <Redirect to={`/main`} />
            dispatch({
                type: END
            })
        });
    }
}

export function fetchStudents() {
    console.log("hihihihihih")
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/dashboards/students`).then(res => {
            console.log(res.data);
            dispatch({
                type: FETCH_STUDENTS,
                payload: {
                    students: res.data
                }
            });

            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Students lists could not be fetched, try again later.");
            <Redirect to='/admin' />
            dispatch({
                type: END
            })
        });
    }
}

export function fetchTeachers() {
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/dashboards/teachers`).then(res => {
            console.log(res.data);
            dispatch({
                type: FETCH_TEACHERS,
                payload: {
                    teachers: res.data
                }
            });

            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Teachers list could not be fetched, try again later.");
            <Redirect to='/admin' />
            dispatch({
                type: END
            })
        });
    }
}

export function addFeedback(feedback, courseID) {
    return dispatch => {
        dispatch({
            type: START
        })
        feedback = Serializer.serialize("feedback", feedback);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/feedbacks`, feedback).then(res => {
            console.log("status", res)
            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Feedback could not be posted, try again later.");
            <Redirect to={`/main`} />
            dispatch({
                type: END
            })
        });
    }
}

export function getFeedback(courseID) {
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/feedbacks`).then(res => {
            Serializer.deserializeAsync("feedback", res.data).then((feedback) => {
                console.log(feedback);
                dispatch({
                    type: GET_FEEDBACKS,
                    payload: feedback
                });
            })

            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Feedbacks could not be fetched, try again later.");
            <Redirect to='/enroll' />
            dispatch({
                type: END
            })
        });
    }
}

export function addAnnouncement(announcement, courseID) {
    return dispatch => {
        dispatch({
            type: START
        })
        announcement = Serializer.serialize("announcement", announcement);
        console.log(announcement);
        return axios.post(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/announcements`, announcement).then(res => {
            console.log("status", res)
            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Announcement could not be posted, try again later.");
            <Redirect to={`main`} />
            dispatch({
                type: END
            })
        });
    }
}

export function getAnnouncement(courseID) {
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/courses/${courseID}/announcements`).then(res => {
            Serializer.deserializeAsync("announcement", res.data).then((announcement) => {
                console.log(announcement);
                dispatch({
                    type: GET_ANNOUNCEMENTS,
                    payload: announcement
                });
            })

            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Announcements could not be fetched, try again later.");
            <Redirect to={`/main`} />
            dispatch({
                type: END
            })
        });
    }
}

export function getUserBookmarked(userID) {
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/users/${userID}/bookmarks`).then(res => {
            dispatch({
                type: GET_CHOICE_QUESTION,
                payload: res.data
            });
            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Questions could not be fetched, try again later.");
            <Redirect to={`/main`} />
            dispatch({
                type: END
            })
        });
    }
}

export function getUserUpvoted(userID) {
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/users/${userID}/upvotes`).then(res => {
            dispatch({
                type: GET_CHOICE_QUESTION,
                payload: res.data
            });
            console.log(res.data);
            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Questions could not be fetched, try again later.");
            <Redirect to={`/main`} />
            dispatch({
                type: END
            })
        });
    }
}

export function getUserDownvoted(userID) {
    return dispatch => {
        dispatch({
            type: START
        })
        return axios.get(process.env.REACT_APP_SERVER_URL + `/api/users/${userID}/downvotes`).then(res => {
            dispatch({
                type: GET_CHOICE_QUESTION,
                payload: res.data
            });
            console.log(res.data)
            dispatch({
                type: END
            })
        }).catch(err => {
            console.log(err);
            alert("Questions could not be fetched, try again later.");
            <Redirect to={`/main`} />
            dispatch({
                type: END
            })
        });
    }
}