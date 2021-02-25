const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

//creating the exam schema

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
        courseId: {
            type: Schema.Types.ObjectID,
            ref: 'Course', 
        },
        name: {
            type: String,
            required: true,
        }
    }],
    userQuestions: [{
        type: Schema.Types.ObjectID,
        ref: 'Question', 
    }],
    userAnswers: [{
        type: Schema.Types.ObjectID,
        ref: 'Answers', 
    }],
    userComments: [{
        type: Schema.Types.ObjectID,
        ref: 'Answers', 
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


// making a exam model in mongodb
const User = mongoose.model('User', userSchema);
module.exports = User;