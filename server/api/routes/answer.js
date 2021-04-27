const express = require('express');
const answerRouter = express.Router();
const answerController = require('../controllers/answer');
const QuestionAndAnswerController = require('../controllers/question_answer');
const multer  = require('multer');
const upload = multer({ dest: 'tmp/', limits: { fileSize: 10485760 }})

answerRouter.post('/courses/:courseId/questions/:questionId/answers', answerController.newAnswer);

answerRouter.get('/courses/:courseId/questions/:questionId/answers',  answerController.answer);

answerRouter.get('/courses/:courseId/questions/:questionId/answers/:answerId', answerController.answer);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/comments', answerController.comment);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/vote', QuestionAndAnswerController.vote);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/bookmark', QuestionAndAnswerController.bookmark);

answerRouter.get('/courses/:courseId/questions/:questionId/answers/:answerId/attachments/:attachmentId', QuestionAndAnswerController.attachment);

answerRouter.post('/courses/:courseId/questions/:questionId/answers/:answerId/attachments', upload.array('attachments[]'), QuestionAndAnswerController.newAttachment);


module.exports = answerRouter;