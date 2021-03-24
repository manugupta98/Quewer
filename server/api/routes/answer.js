const express = require('express');
const answerRouter = express.Router();
const answerController = require('../controllers/answer');
const authMiddleware = require('../middleware/auth');

answerRouter.get('/courses/:course/questions/:question/answers/:answer', authMiddleware.isAuthenticated, answerController.answer)

answerRouter.post('/courses/:course/questions/:question/answers/:answer/vote', authMiddleware.isAuthenticated, answerController.vote)

answerRouter.post('/courses/:course/questions/:question/answers/:answer/bookmark', authMiddleware.isAuthenticated, answerController.bookmark)

module.exports = courseRouter;