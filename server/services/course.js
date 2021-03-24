const Course = require("../models/course.js");
const User = require("../models/user.js");
const createError = require('http-errors')
const lodash = require('lodash');
const UserSerializer = require("../serializers/user.js");


class CourseServices{
    static async enroll(user, courseId){
        await Course.findOne({_id: courseId}).catch((err) => {
            console.log("Exam not found");
            throw createError.NotFound("Exam not found", {expose: true});
        }).then((course) => {
            if (user.registeredCourses.some(item => item == course.id) || course.registeredUsers.some(item => item == user.id)){
                console.log("Already Registered");
                throw createError.Conflict("Already Registered", {expose: true});
            }
            user.registeredCourses.push(course.id,);
            course.registeredUsers.push(user.id,);
            user.save();
            course.save();
        });
    }
}

module.exports = CourseServices;