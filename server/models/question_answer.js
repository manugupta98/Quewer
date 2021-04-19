const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const questinAndAnswerBaseSchema = new mongoose.Schema({
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
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
            },
        }],
    },
    anonymous: {
        type: Boolean,
        default: false,
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
        id:{
            type: String,
            required: true
        },
        format:{
            type: String,
            required: true,
            validate (value) {
                if (!['pdf', 'png', 'jpeg'].includes(value)){
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

questinAndAnswerBaseSchema.pre("save", function(next, done) {
    this.upvotes = this.usersUpvoted.length - this.usersDownvoted.length;
    next();
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

const QuestinAndAnswer = mongoose.model('questionAndAnswer', questinAndAnswerBaseSchema);
const Question = QuestinAndAnswer.discriminator('Question', questionSchema);
const Answer = QuestinAndAnswer.discriminator('Answer', answerSchema);
module.exports = {Question, Answer, QuestinAndAnswer};