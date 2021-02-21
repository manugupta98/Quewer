const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

userRouter.get('/user', authMiddleware.isAuthenticated,userController.userInfo);

// userRouter.get('/user/courses', userController.courses);

// userRouter.get('/user/questions', userController.questions);

// userRouter.get('/user/answers', userController.answers);

// userRouter.get('/user/comments', userController.comments);

module.exports = userRouter;