const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

userRouter.get('/user', authMiddleware.isAuthenticated, userController.userInfo);

userRouter.get('/user/courses', authMiddleware.isAuthenticated, userController.courses);

module.exports = userRouter;