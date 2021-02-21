const express = require('express');
const Course = require('../../models/course');
const createError = require('http-errors');

module.exports = {
    list: async (req, res) => {
        Course.find({}).then((courses) => {
            res.send(courses);
        }).catch((err) => {
            res.status(500).send();
        })
    },
    enroll: async (req, res) => {
        let user = req.user;
        let courseId = req.params.id;
        Course.findOne({_id: courseId}).then((course) => {
            user.registeredCourses.push(course._id);
            user.save();
            res.send();
        }).catch((err) => {
            res.status(500).send();
        })
    }
}