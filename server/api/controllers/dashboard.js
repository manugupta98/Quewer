const express = require('express');
const User = require('../../models/user');
const Question = require('../../models/question_answer').Question;
const Answer = require('../../models/question_answer').Answer;
const Feedback = require('../../models/feedback');
const createError = require('http-errors');
const DashboardServices = require('../../services/dashboard');

const Serializer = require('../../serializers/serializer');

function validateReq(req, res) {
    if (req.user.type !== "admin"){
        res.status(403).json();
    }

    let courseId;

    if ('courseId' in req.params){
        courseId = req.params.courseId;
    }

    let startDate = new Date(0);
    let endDate = new Date();
    if ('start' in req.query){
        startDate = new Date(req.query.start + ' 00:00:00 +0000');
    }
    if ('end' in req.query){
        endDate = new Date(req.query.end + ' 00:00:00 +0000');
        endDate.setDate(endDate.getDate() + 1);
    }
    return {courseId, startDate, endDate};
}

module.exports = {
    dashboard: (req, res) => {
        let courseId, startDate, endDate;
        courseId, startDate, endDate = validateReq(req, res);

        let promises = [
            DashboardServices.getQuestionsGraph(courseId, startDate, endDate),
            DashboardServices.getAnswersGraph(courseId, startDate, endDate),
            Question.countDocuments({course: courseId}),
            Answer.countDocuments({course: courseId}),
            Feedback.countDocuments({course: courseId}),
        ]

        Promise.all(promises).then((results) => {
            let dashboard = {
                questionsGraph: results[0],
                answersGraph: results[1],
                questionsCount: results[2],
                answersCount: results[3],
                feedbacksCount: results[4]
            }
            res.json(Serializer.serialize('dashboard', dashboard));
        }).catch((err) => {
            res.status(500).json();
        })

    },
    students: (req, res) => {
        let courseId, startDate, endDate;
        courseId, startDate, endDate = validateReq(req, res);
        DashboardServices.getStudentsGraph(startDate, endDate).then((studentCount) => {
            res.json(Serializer.serialize('graph', studentCount));
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        })
    },
    questions: (req, res) => {
        let courseId, startDate, endDate;
        courseId, startDate, endDate = validateReq(req, res);

        DashboardServices.getQuestionsGraph(courseId, startDate, endDate).then((questionsCount) => {
            console.log(questionsCount);
            res.json(Serializer.serialize('graph', questionsCount));
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        })
    },
    answers: (req, res) => {
        let courseId, startDate, endDate;
        courseId, startDate, endDate = validateReq(req, res);
        
        DashboardServices.getAnswersGraph(courseId, startDate, endDate).then((answersCount) => {
            res.json(Serializer.serialize('graph', answersCount));
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        })
    },
}