const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/course');
const authMiddleware = require('../middleware/auth');

courseRouter.get('/courses', authMiddleware.isAuthenticated, courseController.course);

courseRouter.get('/courses/:courseID', authMiddleware.isAuthenticated, courseController.course);

courseRouter.post('/courses/:courseID/enroll', authMiddleware.isAuthenticated,courseController.enroll);

courseRouter.post('/courses/:courseID/unenroll', authMiddleware.isAuthenticated,courseController.unenroll);

courseRouter.post('/courses', authMiddleware.isAuthenticated, courseController.add);

courseRouter.delete('/courses/:courseID', authMiddleware.isAuthenticated, courseController.delete);

module.exports = courseRouter;