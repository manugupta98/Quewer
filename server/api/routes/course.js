const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/course');
const authMiddleware = require('../middleware/auth');

courseRouter.get('/course', authMiddleware.isAuthenticated, courseController.courseInfo);

courseRouter.get('/course/list', authMiddleware.isAuthenticated, courseController.list);

courseRouter.get('/course/enroll', authMiddleware.isAuthenticated,courseController.enroll);

module.exports = courseRouter;