const express = require("express");
const User = require("../../models/user");
const createError = require("http-errors");
const UserSerializer = require('../../serializers/user');

module.exports = {
  userInfo: async (req, res) => {
    if (req.user) {
      console.log(UserSerializer.serialize(req.user));
      res.send(UserSerializer.serialize(req.user));
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
