const express = require("express");
const Answer = require("../../models/question_answer").Answer;
const Question = require("../../models/question_answer").Question;
const createError = require("http-errors");
const _ = require("lodash");

const Serializer = require('../../serializers/serializer');


module.exports = {
    answer: (req, res) => {
        filter = {};
        if('answerId' in req.params) {
            filter = {_id: req.params.answerId};
        }        
        Answer.find(filter).then((answer) => {
            res.send(Serializer.serialize("answer", answer));
        }).catch((error) => {
            res.status(500).send();
        })
    },
    newAnswer: (req, res) => {
        let user = req.user;
        let questionId;
        if('questionId' in req.params) {
            questionId = req.params.questionId;
        }    
        Serializer.deserializeAsync("answer", req.body).then((answerJSON)=>{
            answerJSON.postedBy = {id: user.id, name: user.displayName, photos: user.photos, type: user.type};
            answerJSON.question = questionId;
            Answer.create(answerJSON).then((answer) => {
                Question.findOne({_id: answer.question}).then((question) => {
                    question.answers.push(answer._id);
                    question.save();
                })
                res.status(201).json(Serializer.serialize("answer", answer));
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    comment: (req, res) => {
        let user = req.user;
        if('answerId' in req.params) {
            filter = {_id: req.params.answerId};
        }   
        Serializer.deserializeAsync("comments", res.body).then((commentJSON)=>{
            commentJSON.postedBy = {id: user.id, name: user.displayName, photos: user.photos, type: user.type};
            Answer.findOne(filter).then((answer) => {
                answer.comments.push(comment);
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}