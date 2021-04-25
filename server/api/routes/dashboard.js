const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../controllers/dashboard');

dashboardRouter.get('/courses/:courseId/dashboards', dashboardController.dashboard);

dashboardRouter.get('/dashboards/students', dashboardController.students);

dashboardRouter.get('/courses/:courseId/dashboards/questions', dashboardController.questions);

dashboardRouter.get('/courses/:courseId/dashboards/answers', dashboardController.answers);

module.exports = dashboardRouter;