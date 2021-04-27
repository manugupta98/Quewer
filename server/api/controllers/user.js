const express = require("express");
const User = require("../../models/user");
const createError = require("http-errors");
const Course = require("../../models/course");

const Serializer = require('../../serializers/serializer');

module.exports = {
  user: async (req, res) => {
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
        res.json(Serializer.serialize("user", req.user, (req.user.type==='admin')?'admin':'default'));
      });
    }
  },
  teacher: async (req, res) => {
    User.find({type: 'teacher'}).then((teachers) => {
      res.json(Serializer.serialize("user", teachers, (req.user.type==='admin')?'admin':'default'));
    }).catch((err)=> {
      res.status(500).json();
    })
  },
  student: async (req, res) => {
    User.find({type: 'student'}).then((students) => {
      res.json(Serializer.serialize("user", students, (req.user.type==='admin')?'admin':'default'));
    }).catch((err)=> {
      res.status(500).json();
    })
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
  bookmarks: async (req, res) => {
    let user = req.user;
    User.findOne({ _id : user.id })
      .populate("questionBookmarks") // only works if we pushed refs to person.eventsAttended
      .exec(function (err, usr) {
        if (err) return handleError(err);
        res.send(usr.questionBookmarks);
      });
  },
  upvotes: async (req, res) => {
    let user = req.user;
    User.findOne({ _id : user.id })
      .populate("questionUpvoted") // only works if we pushed refs to person.eventsAttended
      .exec(function (err, usr) {
        if (err) return handleError(err);
        res.send(usr.questionUpvoted);
      });
  },
  downvotes: async (req, res) => {
    let user = req.user;
    User.findOne({ _id : user.id })
      .populate("questionDownvoted") // only works if we pushed refs to person.eventsAttended
      .exec(function (err, usr) {
        if (err) return handleError(err);
        res.send(usr.questionDownvoted);
      });
  },
};
