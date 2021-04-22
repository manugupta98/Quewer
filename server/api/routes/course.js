const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/course');
const authMiddleware = require('../middleware/auth');

courseRouter.get('/courses', authMiddleware.isAuthenticated, courseController.course);

courseRouter.get('/courses/:courseId', authMiddleware.isAuthenticated, courseController.course);

courseRouter.post('/courses/:courseId/enroll', authMiddleware.isAuthenticated,courseController.enroll);

courseRouter.post('/courses/:courseId/unenroll', authMiddleware.isAuthenticated,courseController.unenroll);

courseRouter.post('/courses', authMiddleware.isAuthenticated, courseController.add);

courseRouter.delete('/courses/:courseId', authMiddleware.isAuthenticated, courseController.delete);

module.exports = courseRouter;