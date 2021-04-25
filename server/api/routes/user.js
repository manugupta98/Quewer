const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');

userRouter.get('/users', userController.user);

userRouter.get('/teachers', userController.teacher);

userRouter.get('/students', userController.student);

userRouter.get('/users/:userId/courses', userController.courses);

userRouter.get('/users/:userId/bookmarks', userController.bookmarks);

userRouter.get('/users/:userId/downvotes', userController.downvotes);

userRouter.get('/users/:userId/upvotes', userController.upvotes);

module.exports = userRouter;