const express = require("express");
const User = require("../../models/user");
const createError = require("http-errors");

module.exports = {
  userInfo: async (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);

    if (req.user) {
      console.log(req.user);
      res.send(req.user);
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
