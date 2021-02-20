const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

//creating the exam schema

const questionSchema = new mongoose.Schema({
    Course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },    
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    upvotes : {
        type: Number,
        required: true,
        default: 0
    },
    usersUpvoted: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    usersDownvoted: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    attachments: [{
        url:{
            type: String,
            required: true
        },
        format:{
            type: String,
            required: true,
            validate (value) {
                if (!['pdf', 'png', 'jpg'].includes(value)){
                    throw new Error('Attachment type not supported');
                }
            }
        }
    }],
    tags: [{
        type: Schema.Types.ObjectID,
        ref: 'Tags',
        required: true
    }],
    answers: [{
        type: Schema.Types.ObjectID,
        ref: 'Answer',
        required: true
    }]
})



// making a exam model in mongodb
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;