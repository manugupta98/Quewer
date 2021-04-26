const express = require('express');
const Course = require('../../models/course');
const createError = require('http-errors');
const CourseServices = require('../../services/course');

const Serializer = require('../../serializers/serializer');

module.exports = {
    course: (req, res) => {
        filter = {};
        if ('courseId' in req.params){
            filter = {_id: req.params.courseId};
        }
        Course.find(filter).then((courses) => {
            res.send(Serializer.serialize("course", courses));
        }).catch((err) => {
            res.status(500).send();
        })
    },
    enroll: (req, res) => {
        let user = req.user;
        let courseId = req.params.courseId;
        CourseServices.enroll(user, courseId).then(() => {
            res.json();
        }).catch((err) => {
            console.log(err)
            res.status(err.status).send(err.message);
        })
    },
    unenroll: (req, res) => {
        let user = req.user;
        let courseId = req.params.courseId;
        CourseServices.unenroll(user, courseId).then(() => {
            res.json();
        }).catch((err) => {
            res.status(err.status).send(err.message);
        })
    },
    add: (req, res) => {
        console.log(req);
        let user = req.user;
        let course = Serializer.deserialize("course", req.body);
        CourseServices.addCourse(user, course).then((course) => {
            res.json(Serializer.serialize("course", course));
        }).catch((err) => {
            console.log("ERROR ", err)
            res.status(500).send(err.message);
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