const Course = require("../models/course.js");
const User = require("../models/user.js");
const createError = require('http-errors')
const lodash = require('lodash');
const UserSerializer = require("../serializers/user.js");
const ObjectId = require('mongoose').Types.ObjectId;


class CourseServices {
    static async enroll(user, courseId) {
        await Course.findOne({ _id: courseId }).catch((err) => {
            throw createError.NotFound("Course not found", { expose: true });
        }).then((course) => {
            if (course === null) {
                throw createError.NotFound("Course not found", { expose: true });
            }
            console.log(course.title);
            if (user.registeredCourses.some(item => item == course.id) || course.registeredUsers.some(item => item.id == user.id)) {
                throw createError.Conflict("Already Registered", { expose: true });
            }
            user.registeredCourses.push(course.id,);
            course.registeredUsers.push({ id: user.id, name: user.displayName, photos: user.photos, type: user.type },);
            user.save();
            course.save();
        });
    }

    static async unenroll(user, courseId) {
        await Course.findOne({ _id: courseId }).catch((err) => {
            throw createError.NotFound("Course not found", { expose: true });
        }).then((course) => {
            console.log(course.title);
            if (!(user.registeredCourses.some(item => item == course.id) || course.registeredUsers.some(item => item == user.id))) {
                throw createError.Conflict("Not Registered", { expose: true });
            }
            user.registeredCourses.splice(user.registeredCourses.indexOf(course.id,), 1);
            course.registeredUsers.splice(course.registeredUsers.findIndex(item => item.id === user.id), 1);
            user.save();
            course.save();
        });
    }
    static async addCourse(user, course) {
        if (user.type !== "admin") {
            throw createError.Forbidden("", { expose: true });
        }
        return new Promise((resolve, reject) => {

            let teacherIds = course.teachers;
            User.find({ _id: { $in: teacherIds }, type: 'teacher' }).then((teachers) => {
                if (teachers.length !== course.teachers.length) {
                    throw createError.NotFound("Teacher not found");
                }

                course.teachers = [];
                teachers.map(teacher => {
                    course.teachers.push({ id: teacher.id, name: teacher.displayName, photos: teacher.photos, type: teacher.type, });
                })
                return Course.create(course)
            }).then((course) => {
                User.updateMany({
                    _id: { $in: teacherIds }
                },
                    {
                        $push: {
                            registeredCourses: course._id
                        }
                    }
                )
                console.log('Course added successfully :) ');
                resolve(course);
            }).catch((err) => {
                console.log('Course adding unsuccessfully :) ');
                throw createError.InternalServerError("Course cannot be added successfully", { expose: true });
            });
        })
    }
    static async deleteCourse(user, courseId) {
        if (user.type !== "admin") {
            throw createError.Forbidden("", { expose: true });
        }
        await Course.deleteOne({ _id: courseId }).then((course) => {
            console.log("Course successfully deleted from the database :) ");
        }).catch((err) => {
            console.log("Course not found");
            throw createError.NotFound("Course not found", { expose: true });
        });
    }
}

module.exports = CourseServices;