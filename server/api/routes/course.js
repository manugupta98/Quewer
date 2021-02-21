const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/course');
const authMiddleware = require('../middleware/auth');

courseRouter.get('/course/list', authMiddleware.isAuthenticated, courseController.list);

courseRouter.get('/course/enroll', authMiddleware.isAuthenticated,courseController.enroll);

// courseRouter.get('/course', authMiddleware.isAuthenticated,userController.userInfo);

// courseRouter.get('/course', authMiddleware.isAuthenticated,userController.userInfo);

module.exports = courseRouter;