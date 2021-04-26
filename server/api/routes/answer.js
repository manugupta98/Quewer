const express = require('express');
const answerRouter = express.Router();
const answerController = require('../controllers/answer');
const QuestionAndAnswerController = require('../controllers/question_answer');

answerRouter.post('/courses/:courseId/questions/:questionId/answers', answerController.newAnswer);

answerRouter.get('/courses/:courseId/questions/:questionId/answers',  answerController.answer);

answerRouter.get('/courses/:courseId/questions/:questionId/answers/:answerId', answerController.answer);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/comments', answerController.comment);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/vote', QuestionAndAnswerController.vote);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/bookmark', QuestionAndAnswerController.bookmark);

module.exports = answerRouter;