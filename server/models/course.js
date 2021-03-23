const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    registeredUsers:[{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    }],
})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;