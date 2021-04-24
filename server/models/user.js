const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    name: {
        givenName: {
            type: String,
            required: true,
        },
        familyName: {
            type: String,
            required: true,
        },
    },
    photos: [{
        value: {
            type: String,
            required: true,
        },
    }],
    emails: [{
        value: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            required: true,
        }
    }],
    type: {
        type: String,
        required: true,
    },
    registeredCourses: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Course', 
        },
    ],
    userQuestions: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Question', 
        }
    ],
    userAnswers: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Answers',
        }, 
    ],
    userComments: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Answers', 
        },
    ],
    questionUpvoted: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Question', 
        }
    ], 
    questionDownvoted: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Question', 
        }
    ],
    questionBookmarks: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Question', 
        }
    ],
    answerUpvoted: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Answer', 
        }
    ], 
    answerDownvoted: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Answer', 
        }
    ],
    answerBookmarks: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Answer', 
        }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
})


userSchema.statics.findOrCreate = function(filter){
    return new Promise((resolve, reject) => {
        this.findOne({googleId: filter.googleId}).then((user) => {
            if (user){
                resolve(user);
            }else{
                this.create(filter).then((newUser) => {
                    resolve(newUser);
                })
            }
        }).catch((err) => {
            reject(err);
        })
    });

}

const User = mongoose.model('User', userSchema);
module.exports = User;