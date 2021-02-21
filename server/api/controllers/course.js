const express = require('express');
const Course = require('../../models/course');
const createError = require('http-errors');

module.exports = {
    list: async (req, res) => {
        Course.find({}).then((courses) => {
            console.log(courses);
            res.send(courses);
        }).catch((err) => {
            res.status(500).send();
        })
    }
}