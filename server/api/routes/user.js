const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

userRouter.get('/user', userController.userInfo);

userRouter.get('/user/courses', userController.courses);

module.exports = userRouter;