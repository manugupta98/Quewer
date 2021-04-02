const express = require('express');
const Question = require('../../models/question_answer').Question;
const createError = require('http-errors');
const {QuestionSerializer, QuestionDeserializer} = require('../../serializers/question');
// const questionServices = require('../../services/question')

module.exports = {
    question: (req, res) => {
        filter = {course: req.params.courseID};
        if ('questionID' in req.params){
            filter = {...filter,
                _id: req.params.questionID};
        }
        console.log('filter', filter);
        Question.find(filter).then((question) => {
            res.send(QuestionSerializer.serialize(question));
        }).catch((err) => {
            res.status(500).send();
        })
    },
    newQuestion: (req, res) => {
        QuestionDeserializer.deserialize(req.body).then((questionJSON)=>{
            Question.create(questionJSON).then((question) => {
                res.status(201).json(QuestionSerializer.serialize(question));
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}