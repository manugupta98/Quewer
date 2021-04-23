const express = require('express');
const User = require('../../models/user');
const Question = require('../../models/question_answer').Question;
const Answer = require('../../models/question_answer').Answer;
const createError = require('http-errors');

const Serializer = require('../../serializers/serializer');

module.exports = {
    students: (req, res) => {
        if (req.user.type !== "admin"){
            res.status(403).json();
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
        User.aggregate([
            {
                $match: {
                    type: 'student',
                    date: {$lt: endDate, $gt: startDate},
                }
            },
            {
                $group: {
                    _id: {
                        day: {
                            $dayOfMonth: '$date',
                        },
                        month: {
                            $month: '$date',
                        },
                        year: {
                            $year: '$date',
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },{
                $project: {
                    date: '$_id',
                    count: '$count',
                }  
            },
            {
                $sort: {
                    'date.year': -1,
                    'date.month': -1,
                    'date.day': -1,
                },
            },
        ]).then((studentCount) => {
            res.json(Serializer.serialize('graph', studentCount));
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        })
    },
    questions: (req, res) => {
        if (req.user.type !== "admin"){
            res.status(403).json();
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
        Question.aggregate([
            {
                $match: {
                    date: {$lt: endDate, $gt: startDate},
                }
            },
            {
                $group: {
                    _id: {
                        day: {
                            $dayOfMonth: '$date',
                        },
                        month: {
                            $month: '$date',
                        },
                        year: {
                            $year: '$date',
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },{
                $project: {
                    date: '$_id',
                    count: '$count',
                }  
            },
            {
                $sort: {
                    'date.year': -1,
                    'date.month': -1,
                    'date.day': -1,
                },
            },
        ]).then((questionsCount) => {
            res.json(Serializer.serialize('graph', questionsCount));
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        })
    },
    answers: (req, res) => {
        if (req.user.type !== "admin"){
            res.status(403).json();
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
        Answer.aggregate([
            {
                $match: {
                    date: {$lt: endDate, $gt: startDate},
                }
            },
            {
                $group: {
                    _id: {
                        day: {
                            $dayOfMonth: '$date',
                        },
                        month: {
                            $month: '$date',
                        },
                        year: {
                            $year: '$date',
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },{
                $project: {
                    date: '$_id',
                    count: '$count',
                }  
            },
            {
                $sort: {
                    'date.year': -1,
                    'date.month': -1,
                    'date.day': -1,
                },
            },
        ]).then((answersCount) => {
            res.json(Serializer.serialize('graph', answersCount));
        }).catch((err) => {
            console.log(err);
            res.status(500).json();
        })
    },
}