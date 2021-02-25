const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

//creating the exam schema

const answerSchema = new mongoose.Schema({
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



// making a exam model in mongodb
const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;