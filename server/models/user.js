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
    registeredCourses: [{
        id: {
            type: Schema.Types.ObjectID,
            ref: 'Course', 
        },
    }],
    userQuestions: [{
        id: {
            type: Schema.Types.ObjectID,
            ref: 'Question', 
        }
    }],
    userAnswers: [{
        id: {
            type: Schema.Types.ObjectID,
            ref: 'Answers',
        }, 
    }],
    userComments: [{
        id: {
            type: Schema.Types.ObjectID,
            ref: 'Answers', 
        },
    }],  
    questionBookmarks:  [{
        id: {
            type: Schema.Types.ObjectID,
            ref: 'Question', 
        }
    }],
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