const Course = require("../models/course.js");
const User = require("../models/user.js");
const createError = require('http-errors')
const lodash = require('lodash');
const UserSerializer = require("../serializers/user.js");


class CourseServices{
    static async enroll(user, courseId){
        await Course.findOne({_id: courseId}).catch((err) => {
            throw createError.NotFound("Course not found", {expose: true});
        }).then((course) => {
            console.log(course.title);
            if (user.registeredCourses.some(item => item == course.id) || course.registeredUsers.some(item => item.id == user.id)){
                throw createError.Conflict("Already Registered", {expose: true});
            }
            user.registeredCourses.push(course.id,);
            course.registeredUsers.push({id: user.id, name: user.displayName, photos: user.photos,},);
            user.save();
            course.save();
        });
    }

    static async unenroll(user, courseId){
        await Course.findOne({_id: courseId}).catch((err) => {
            throw createError.NotFound("Course not found", {expose: true});
        }).then((course) => {
            console.log(course.title);
            if (!(user.registeredCourses.some(item => item == course.id) || course.registeredUsers.some(item => item == user.id))){
                throw createError.Conflict("Not Registered", {expose: true});
            }
            user.registeredCourses.splice(user.registeredCourses.indexOf(course.id,), 1);
            course.registeredUsers.splice(course.registeredUsers.findIndex(item => item.id === user.id), 1);
            user.save();
            course.save();
        });
    }
}

module.exports = CourseServices;