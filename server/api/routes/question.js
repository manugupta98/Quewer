const express = require('express');
const questionRouter = express.Router();
const questionController = require('../controllers/question');
const authMiddleware = require('../middleware/auth');

// questionRouter.get('/courses', authMiddleware.isAuthenticated, courseController.course);

questionRouter.get('/courses/:courseID/questions', authMiddleware.isAuthenticated, questionController.question);

questionRouter.get('/courses/:courseID/questions/:questionID', authMiddleware.isAuthenticated, questionController.question);

questionRouter.post('/courses/:courseID/questions', authMiddleware.isAuthenticated, questionController.newQuestion);


module.exports = questionRouter;