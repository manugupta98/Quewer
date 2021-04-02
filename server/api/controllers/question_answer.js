const express = require('express');
const QuestionAndAnswer = require('../../models/question_answer').QuestinAndAnswer;
const createError = require('http-errors');
const {QuestionSerializer, QuestionDeserializer} = require('../../serializers/question');
const {UserSerializer} = require('../../serializers/user');
const {QuestionAndAnswerServices, VOTE, BOOKMARK} = require('../../services/question_answer')


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
        }else if ('action' in req.body){
            action = VOTE.get(req.body.action);
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
    bookmark: async (req, res) => {
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
            action = BOOKMARK.get(req.query.action);
        }else if ('action' in req.body){
            action = BOOKMARK.get(req.body.action);
        }else{
            res.status(400).send("action absent");
        }

        await QuestionAndAnswerServices.bookmark(req.user, questionAndAnswerId, action).then((user) => {
            res.status(200).json(UserSerializer.serialize(user));
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        });
    },
}