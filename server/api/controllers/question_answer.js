const express = require('express');
const QuestionAndAnswer = require('../../models/question_answer').QuestinAndAnswer;
const createError = require('http-errors');
const {QuestionSerializer, QuestionDeserializer} = require('../../serializers/question');
const {QuestionAndAnswerServices, VOTE} = require('../../services/question_answer')


module.exports = {
    vote: async (req, res) => {
        var questionAndAnswerId;
        if ('questionID' in req.params){
            questionAndAnswerId =  req.params.questionID;
        }else{
            res.status(400).send("questionId absent");
        }

        if ('answerID' in req.params){
            questionAndAnswerId = req.params.answerID
        }

        var action;
        if ('action' in req.query){
            action = VOTE.get(req.query.action);
        }else{
            res.status(400).send("action absent");
        }

        await QuestionAndAnswerServices.vote(req.user, questionAndAnswerId, action).then((question) => {
            res.status(200).json(QuestionSerializer.serialize(question));
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        });
    },
}