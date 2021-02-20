const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

//creating the exam schema

const userSchema = new mongoose.Schema({
    registeredCourses: [{
        type: Schema.Types.ObjectID,
        ref: 'Course', 
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



// making a exam model in mongodb
const User = mongoose.model('User', userSchema);
module.exports = User;