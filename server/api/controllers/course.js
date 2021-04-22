const express = require('express');
const Course = require('../../models/course');
const createError = require('http-errors');
const CourseServices = require('../../services/course');

const Serializer = require('../../serializers/serializer');

module.exports = {
    course: (req, res) => {
        filter = {};
        if ('courseID' in req.params){
            filter = {_id: req.params.courseID};
        }
        Course.find(filter).then((courses) => {
            res.send(Serializer.serialize("course", courses));
        }).catch((err) => {
            res.status(500).send();
        })
    },
    enroll: (req, res) => {
        let user = req.user;
        let courseId = req.params.courseID;
        CourseServices.enroll(user, courseId).then(() => {
            res.json();
        }).catch((err) => {
            console.log(err)
            res.status(err.status).send(err.message);
        })
    },
    unenroll: (req, res) => {
        let user = req.user;
        let courseId = req.params.courseID;
        CourseServices.unenroll(user, courseId).then(() => {
            res.json();
        }).catch((err) => {
            res.status(err.status).send(err.message);
        })
    },
    add: (req, res) => {
        let user = req.user;
        let course = req.body;
        CourseServices.addCourse(user, course).then(() => {
            res.json(Serializer.serialize("course", course));
        }).catch((err) => {
            res.status(err.status).send(err.message);
        })
    },
    delete: (req, res) => {
        let user = req.user;
        let courseId = req.params.courseID;
        CourseServices.deleteCourse(user, courseId).then(() => {
            res.json();
        }).catch((err) => {
            res.status(err.status).send(err.message);
        })
    },
}