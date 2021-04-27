const express = require('express');
const questionRouter = express.Router();
const questionController = require('../controllers/question');
const QuestionAndAnswerController = require('../controllers/question_answer');
const multer  = require('multer');
const upload = multer({ dest: 'tmp/', limits: { fileSize: 10485760 }})

// questionRouter.get('/courses', courseController.course);

questionRouter.get('/courses/:courseId/questions', questionController.question);

questionRouter.get('/courses/:courseId/questions/:questionId', questionController.question);

questionRouter.post('/courses/:courseId/questions', questionController.newQuestion);

questionRouter.post('/courses/:courseId/questions/:questionId/vote', QuestionAndAnswerController.vote);

questionRouter.post('/courses/:courseId/questions/:questionId/bookmark', QuestionAndAnswerController.bookmark);

questionRouter.get('/courses/:courseId/questions/:questionId/attachments/:attachmentId', QuestionAndAnswerController.attachment);

questionRouter.post('/courses/:courseId/questions/:questionId/attachments', upload.array('attachments[]'), QuestionAndAnswerController.newAttachment);

module.exports = questionRouter;