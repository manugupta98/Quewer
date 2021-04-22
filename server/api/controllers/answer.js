const express = require("express");
const Answer = require("../../models/question_answer").Answer;
const Question = require("../../models/question_answer").Question;
const createError = require("http-errors");
const _ = require("lodash");

const Serializer = require('../../serializers/serializer');


module.exports = {
    answer: (req, res) => {
        filter = {};
        if('answer' in req.params) {
            filter = {_id: req.params.answer};
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
        if('question' in req.params) {
            questionId = req.params.question;
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
        if('answer' in req.params) {
            filter = {_id: req.params.answer};
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