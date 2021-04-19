const express = require('express');
const questionRouter = express.Router();
const questionController = require('../controllers/question');
const QuestionAndAnswerController = require('../controllers/question_answer');
const authMiddleware = require('../middleware/auth');
const multer  = require('multer');
const { attachment } = require('../controllers/question_answer');
const upload = multer({ dest: 'tmp/'})

// questionRouter.get('/courses', authMiddleware.isAuthenticated, courseController.course);

questionRouter.get('/courses/:courseID/questions', authMiddleware.isAuthenticated, questionController.question);

questionRouter.get('/courses/:courseID/questions/:questionID', authMiddleware.isAuthenticated, questionController.question);

questionRouter.post('/courses/:courseID/questions', authMiddleware.isAuthenticated, questionController.newQuestion);

questionRouter.post('/courses/:courseID/questions/:questionID/vote', authMiddleware.isAuthenticated, QuestionAndAnswerController.vote);

questionRouter.post('/courses/:courseID/questions/:questionID/bookmark', authMiddleware.isAuthenticated, QuestionAndAnswerController.bookmark);

questionRouter.get('/courses/:courseID/questions/:questionID/attachments/:attachmentId', authMiddleware.isAuthenticated, QuestionAndAnswerController.attachment);

questionRouter.post('/courses/:courseID/questions/:questionID/attachments', authMiddleware.isAuthenticated, upload.array('attachments'), QuestionAndAnswerController.newAttachment);

module.exports = questionRouter;