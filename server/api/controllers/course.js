const express = require('express');
const Course = require('../../models/course');
const createError = require('http-errors');
const CourseSerializer = require('../../serializers/course')
const CourseServices = require('../../services/course')

module.exports = {
    course: (req, res) => {
        filter = {};
        if ('course' in req.params){
            filter = {_id: req.params.course};
        }
        Course.find(filter).then((courses) => {
            res.send(CourseSerializer.serialize(courses));
        }).catch((err) => {
            res.status(500).send();
        })
    },
    enroll: (req, res) => {
        let user = req.user;
        let courseId = req.params.course;
        CourseServices.enroll(user, courseId).then(() => {
            res.json("Successfully registered");
        }).catch((err) => {
            res.status(err.status).send(err.message);
        })
    },
}