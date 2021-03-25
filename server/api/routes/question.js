const express = require('express');
const questionRouter = express.Router();
const questionController = require('../controllers/question');
const QuestionAndAnswerController = require('../controllers/question_answer');
const authMiddleware = require('../middleware/auth');

// questionRouter.get('/courses', authMiddleware.isAuthenticated, courseController.course);

questionRouter.get('/courses/:courseID/questions', authMiddleware.isAuthenticated, questionController.question);

questionRouter.get('/courses/:courseID/questions/:questionID', authMiddleware.isAuthenticated, questionController.question);

questionRouter.post('/courses/:courseID/questions', authMiddleware.isAuthenticated, questionController.newQuestion);

questionRouter.post('/courses/:courseID/questions/:questionID/vote', authMiddleware.isAuthenticated, QuestionAndAnswerController.vote);

module.exports = questionRouter;