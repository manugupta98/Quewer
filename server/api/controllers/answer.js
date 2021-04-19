const express = require("express");
const Answer = require("../../models/question_answer");
const Course = require("../../models/question_answer");
const {AnswerSerializer, AnswerDeserializer} = require('../../serializers/answer');
const createError = require("http-errors");
const question = require("./question");
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const { filter } = require("lodash");


module.exports = {
    answer: (req, res) => {
        filter = {};
        if('answer' in req.params) {
            filter = {_id: req.params.answer};
        }        
        Answer.find(filter).then((answer) => {
            res.send(AnswerSerializer.serialize(answer));
        }).catch((error) => {
            res.status(500).send();
        })
    },
    newAnswer: (req, res) => {
        AnswerDeserializer.deserialize(req.body).then((answerJSON)=>{
            Answer.create(answerJSON).then((answer) => {
                question.findOne({_id: answer.question}).then((question) => {
                    question.answers.push(answer._id);
                })
                res.status(201).json(AnswerSerializer.serialize(answer));
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    comment: (req, res) => {
        if('answer' in req.params) {
            filter = {_id: req.params.answer};
        }   
        JSONAPIDeserializer({
            keyForAttribute: 'camelCase',
        }).deserialize(res.body).then((commentJSON)=>{
            Answer.findOne(filter).then((answer) => {
                answer.comments.push(comment);
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}