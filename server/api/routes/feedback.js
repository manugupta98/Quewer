const express = require('express');
const feedbackRouter = express.Router();
const feedbackController = require('../controllers/feedback');
const authMiddleware = require('../middleware/auth');

feedbackRouter.get('/courses/:courseId/feedbacks', authMiddleware.isAuthenticated, feedbackController.feedback);

feedbackRouter.get('/courses/:courseId/feedbacks/:feedbackId', authMiddleware.isAuthenticated, feedbackController.feedback);

feedbackRouter.post('/courses/:courseId/feedbacks', authMiddleware.isAuthenticated, feedbackController.newFeedback);

module.exports = feedbackRouter;