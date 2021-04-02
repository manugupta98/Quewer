const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/course');
const authMiddleware = require('../middleware/auth');

courseRouter.get('/courses', authMiddleware.isAuthenticated, courseController.course);

courseRouter.get('/courses/:course', authMiddleware.isAuthenticated, courseController.course);

courseRouter.post('/courses/:course/enroll', authMiddleware.isAuthenticated,courseController.enroll);

courseRouter.post('/courses/:course/unenroll', authMiddleware.isAuthenticated,courseController.unenroll);

module.exports = courseRouter;