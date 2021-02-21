const express = require("express");
const User = require("../../models/user");
const createError = require("http-errors");

module.exports = {
  userInfo: async (req, res) => {
    if (req.user) {
      res.send(req.user);
    }
  },
  course: async (req, res) => {
    let user = req.user;
    User.findOne({ _id : user.id })
      .populate("registeredCourses") // only works if we pushed refs to person.eventsAttended
      .exec(function (err, user) {
        if (err) return handleError(err);
        console.log(user.registeredCourses);
      });
  },
};
