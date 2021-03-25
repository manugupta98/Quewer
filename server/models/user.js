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
    questionBookmarks:  [
        {
            type: Schema.Types.ObjectID,
            ref: 'Question', 
        }
    ],
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