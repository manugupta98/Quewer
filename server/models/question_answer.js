const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const questinAndAnswerBaseSchema = new mongoose.Schema({
    course:{
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
})

const questionSchema = new mongoose.Schema({
    answers: [{
        type: Schema.Types.ObjectID,
        ref: 'Answer',
        required: true
    }]
})

const answerSchema = new mongoose.Schema({
    question: {
        type: Schema.Types.ObjectID,
        ref: 'Question',
        required: true
    },
    comments: [{
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        comment: {
            type: String,
            required: true,
        },
    }],
})

const questinAndAnswerBase = mongoose.model('questionAndAnswer', questinAndAnswerBaseSchema);
const Question = questinAndAnswerBase.discriminator('Question', questionSchema);
const Answer = questinAndAnswerBase.discriminator('Answer', answerSchema);
module.exports = {Question, Answer};