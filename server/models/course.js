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
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name:{
            type: String,
        },
        photos: [{
            value: {
                type: String,
                required: true,
            },
        }],
        type: {
            type: String,
        }
    },
    registeredUsers:[{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name:{
            type: String,
            required: true
        },
        photos: [{
            value: {
                type: String,
                required: true,
            },
        }],
        type: {
            type: String,
            required: true
        }
    }],
})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;