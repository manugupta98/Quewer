const Question = require("../models/question_answer").Question;
const Answer = require("../models/question_answer").Answer;
const Login = require("../models/login");
const createError = require('http-errors')
const ObjectId = require('mongoose').Types.ObjectId;

class DashboardServices {
    static async getStudentsGraph(startDate, endDate) {
        return new Promise((resolve, reject) => {
            Login.aggregate([
                {
                    $match: {
                        type: 'student',
                        created: { $lt: endDate, $gt: startDate },
                    }
                },
                {
                    $group: {
                        _id: {
                            day: {
                                $dayOfMonth: '$created',
                            },
                            month: {
                                $month: '$created',
                            },
                            year: {
                                $year: '$created',
                            },
                        },
                        count: {
                            $sum: 1,
                        },
                    },
                }, {
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
            ]).then((studentGraph) => {
                resolve(studentGraph);
            })
        })
    }
    static async getQuestionsGraph(courseId, startDate, endDate) {
        return new Promise((resolve, reject) => {
            Question.aggregate([
                {
                    $match: {
                        date: { $lt: endDate, $gt: startDate },
                        course: ObjectId(courseId),
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
                }, {
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
            ]).then((questionsGraph) => {
                resolve(questionsGraph);
            })
        })
    }

    static async getAnswersGraph(courseId, startDate, endDate) {
        return new Promise((resolve, reject) => {
            Answer.aggregate([
                {
                    $match: {
                        date: { $lt: endDate, $gt: startDate },
                        course: courseId,
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
                }, {
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
            ]).then((answerGraph) => {
                resolve(answerGraph);
            })
        })
    }
}

module.exports = DashboardServices;