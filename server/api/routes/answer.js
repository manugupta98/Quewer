const express = require('express');
const answerRouter = express.Router();
const answerController = require('../controllers/answer');
const authMiddleware = require('../middleware/auth');

answerRouter.get('/courses/:course/questions/:question/:answer', authMiddleware.isAuthenticated, answerController.answer)

answerRouter.get('/courses/:course/questions/:question/:answer/:value', authMiddleware.isAuthenticated, answerController.upDownAnswer)

answerRouter.get('/courses/:course/questions/:question/:answer/:bookmarkBool', authMiddleware.isAuthenticated, answerController.bookMarkAnser)

module.exports = courseRouter;