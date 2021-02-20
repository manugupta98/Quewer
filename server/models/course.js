const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

//creating the exam schema

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    describtion: {
        type: String,
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    registeredUsers:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
})



// making a exam model in mongodb
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;