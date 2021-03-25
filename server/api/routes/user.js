const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

userRouter.get('/users', authMiddleware.isAuthenticated, userController.userInfo);

userRouter.get('/users/:user/courses', authMiddleware.isAuthenticated, userController.courses);

module.exports = userRouter;