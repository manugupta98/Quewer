const express = require("express");
const Answer = require("../../models/question_answer");
const Course = require("../../models/question_answer");
const {AnswerSerializer, AnswerDeserializer} = require('../../serializers/answer');
const createError = require("http-errors");

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
    }
}