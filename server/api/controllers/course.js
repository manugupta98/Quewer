const express = require('express');
const Course = require('../../models/course');
const createError = require('http-errors');
const CourseSerializer = require('../../serializers/course')
const CourseServices = require('../../services/course')

module.exports = {
    course: (req, res) => {
        filter = {};
        if ('courseID' in req.params){
            filter = {_id: req.params.courseID};
        }
        Course.find(filter).then((courses) => {
            res.send(CourseSerializer.serialize(courses));
        }).catch((err) => {
            res.status(500).send();
        })
    },
    enroll: (req, res) => {
        let user = req.user;
        let courseId = req.params.courseID;
        CourseServices.enroll(user, courseId).then(() => {
            res.json("Successfully enrolled");
        }).catch((err) => {
            res.status(err.status).send(err.message);
        })
    },
    unenroll: (req, res) => {
        let user = req.user;
        let courseId = req.params.courseID;
        CourseServices.unenroll(user, courseId).then(() => {
            res.json("Successfully unenrolled");
        }).catch((err) => {
            res.status(err.status).send(err.message);
        })
    },
    add: (req, res) => {
        let user = req.user;
        let course = req.body;
        CourseServices.addCourse(user, course).then(() => {
            res.json("Successfully Added");
        }).catch((err) => {
            res.status(err.status).send(err.message);
        })
    },
    delete: (req, res) => {
        let user = req.user;
        let courseId = req.params.courseID;
        CourseServices.deleteCourse(user, courseId).then(() => {
            res.json("Successfully deleted");
        }).catch((err) => {
            res.status(err.status).send(err.message);
        })
    },
}