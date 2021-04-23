const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../controllers/dashboard');
const authMiddleware = require('../middleware/auth');

dashboardRouter.get('/dashboards/students', authMiddleware.isAuthenticated, dashboardController.students);

dashboardRouter.get('/dashboards/questions', authMiddleware.isAuthenticated, dashboardController.questions);

dashboardRouter.get('/dashboards/answers', authMiddleware.isAuthenticated, dashboardController.answers);

module.exports = dashboardRouter;