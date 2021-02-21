const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user')

userRouter.get('/user', userController.userInfo);

// userRouter.get('/user/courses', userController.courses);

// userRouter.get('/user/questions', userController.questions);

// userRouter.get('/user/answers', userController.answers);

// userRouter.get('/user/comments', userController.comments);

module.exports = userRouter;