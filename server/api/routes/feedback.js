const express = require('express');
const feedbackRouter = express.Router();
const feedbackController = require('../controllers/feedback');

feedbackRouter.get('/courses/:courseId/feedbacks', feedbackController.feedback);

feedbackRouter.get('/courses/:courseId/feedbacks/:feedbackId', feedbackController.feedback);

feedbackRouter.post('/courses/:courseId/feedbacks', feedbackController.newFeedback);

module.exports = feedbackRouter;