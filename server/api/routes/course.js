const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/course');

courseRouter.get('/courses', courseController.course);

courseRouter.get('/courses/:courseId', courseController.course);

courseRouter.post('/courses/:courseId/enroll', courseController.enroll);

courseRouter.post('/courses/:courseId/unenroll', courseController.unenroll);

courseRouter.post('/courses', courseController.add);

courseRouter.delete('/courses/:courseId', courseController.delete);

module.exports = courseRouter;