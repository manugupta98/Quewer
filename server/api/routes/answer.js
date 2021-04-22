const express = require('express');
const answerRouter = express.Router();
const answerController = require('../controllers/answer');
const QuestionAndAnswerController = require('../controllers/question_answer');
const authMiddleware = require('../middleware/auth');

answerRouter.post('/courses/:courseId/questions/:questionId/answers', authMiddleware.isAuthenticated, answerController.newAnswer);

answerRouter.get('/courses/:courseId/questions/:questionId/answers', authMiddleware.isAuthenticated, answerController.answer);

answerRouter.get('/courses/:courseId/questions/:questionId/answers/:answerId', authMiddleware.isAuthenticated, answerController.answer);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/comment', authMiddleware.isAuthenticated, answerController.comment);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/vote', authMiddleware.isAuthenticated, QuestionAndAnswerController.vote);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/bookmark', authMiddleware.isAuthenticated, QuestionAndAnswerController.bookmark);

module.exports = answerRouter;