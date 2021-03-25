const express = require("express");
const User = require("../../models/user");
const createError = require("http-errors");
const UserSerializer = require('../../serializers/user');
const Course = require("../../models/course");
const { ReactWrapper } = require("enzyme");

module.exports = {
  userInfo: async (req, res) => {
    if (req.user) {
      var promises = [];
      if ('include' in req.query){
        if (req.query.include === 'courses'){
          promises = req.user.registeredCourses.map(async (course) => {
            return new Promise((resolve, reject) => {
              Course.findOne({_id: course}).then((course) => {
                resolve(course);
              })
            })
          })

        }
      }
      Promise.all(promises).then((courses) => {
        if (typeof courses !== 'undefined'){
          req.user.registeredCourses = courses;
        }
        res.json(UserSerializer.serialize(req.user));
      });
    }
  },
  courses: async (req, res) => {
    let user = req.user;
    User.findOne({ _id : user.id })
      .populate("registeredCourses") // only works if we pushed refs to person.eventsAttended
      .exec(function (err, usr) {
        if (err) return handleError(err);
        res.send(usr.registeredCourses);
      });
  },
};
