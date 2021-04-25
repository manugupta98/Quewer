const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const feedbackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        rewuired: true,
    },
    postedBy: {
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
            required: true
        }
    },
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    anonymous: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
})

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;