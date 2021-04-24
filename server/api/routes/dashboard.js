const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../controllers/dashboard');
const authMiddleware = require('../middleware/auth');

dashboardRouter.get('/courses/:courseId/dashboards', authMiddleware.isAuthenticated, dashboardController.dashboard);

dashboardRouter.get('/dashboards/students', authMiddleware.isAuthenticated, dashboardController.students);

dashboardRouter.get('/courses/:courseId/dashboards/questions', authMiddleware.isAuthenticated, dashboardController.questions);

dashboardRouter.get('/courses/:courseId/dashboards/answers', authMiddleware.isAuthenticated, dashboardController.answers);

module.exports = dashboardRouter;